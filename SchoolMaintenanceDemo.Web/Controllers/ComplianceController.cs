using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace SchoolMaintenanceDemo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplianceController : ControllerBase
    {
        private static readonly object SyncLock = new();
        private readonly IWebHostEnvironment _environment;

        public ComplianceController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost("UploadDocument")]
        public ActionResult UploadDocument([FromForm] UploadComplianceDocumentRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.OrganizationName) ||
                string.IsNullOrWhiteSpace(request.SchoolName) ||
                string.IsNullOrWhiteSpace(request.BuildingName) ||
                string.IsNullOrWhiteSpace(request.DocumentType))
            {
                return BadRequest(new { message = "Organization, school, building, and document type are required." });
            }

            if (request.Files == null || request.Files.Count == 0)
            {
                return BadRequest(new { message = "At least one file is required." });
            }

            var uploaded = SaveDocuments(request);
            if (uploaded.Count == 0)
            {
                return BadRequest(new { message = "No valid files uploaded. Use pdf, jpg, png, doc, or docx." });
            }

            lock (SyncLock)
            {
                var all = LoadRecords();
                all.AddRange(uploaded);
                Persist(all);
            }

            return Ok(new { message = "Document(s) uploaded.", items = uploaded });
        }

        [HttpGet("RecentDocuments")]
        public ActionResult<List<ComplianceDocumentRecord>> RecentDocuments(int take = 30)
        {
            if (take <= 0)
            {
                take = 30;
            }

            lock (SyncLock)
            {
                var all = LoadRecords();
                return all.OrderByDescending(x => x.UploadedAt).Take(take).ToList();
            }
        }

        private List<ComplianceDocumentRecord> SaveDocuments(UploadComplianceDocumentRequest request)
        {
            var allowedExtensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                ".pdf", ".png", ".jpg", ".jpeg", ".doc", ".docx"
            };

            var webRoot = _environment.WebRootPath;
            if (string.IsNullOrWhiteSpace(webRoot))
            {
                webRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            var dateToken = DateTime.UtcNow.ToString("yyyyMMdd");
            var relativeFolder = Path.Combine("uploads", "compliance", dateToken);
            var absoluteFolder = Path.Combine(webRoot, relativeFolder);
            Directory.CreateDirectory(absoluteFolder);

            var records = new List<ComplianceDocumentRecord>();

            foreach (var file in request.Files)
            {
                if (file == null || file.Length == 0)
                {
                    continue;
                }

                var ext = Path.GetExtension(file.FileName);
                if (!allowedExtensions.Contains(ext))
                {
                    continue;
                }

                var baseName = Path.GetFileNameWithoutExtension(file.FileName);
                var cleanName = string.Join("_", baseName.Split(Path.GetInvalidFileNameChars(), StringSplitOptions.RemoveEmptyEntries));
                if (string.IsNullOrWhiteSpace(cleanName))
                {
                    cleanName = "document";
                }

                var storedName = $"{DateTime.UtcNow:HHmmssfff}_{Guid.NewGuid():N}_{cleanName}{ext}";
                var absolutePath = Path.Combine(absoluteFolder, storedName);

                using (var stream = System.IO.File.Create(absolutePath))
                {
                    file.CopyTo(stream);
                }

                records.Add(new ComplianceDocumentRecord
                {
                    OrganizationName = request.OrganizationName.Trim(),
                    SchoolName = request.SchoolName.Trim(),
                    BuildingName = request.BuildingName.Trim(),
                    DocumentType = request.DocumentType.Trim(),
                    PermitNumber = request.PermitNumber?.Trim() ?? string.Empty,
                    IssuingAgency = request.IssuingAgency?.Trim() ?? string.Empty,
                    ExpiresAt = request.ExpiresAt?.Trim() ?? string.Empty,
                    RequirementId = request.RequirementId?.Trim() ?? string.Empty,
                    Notes = request.Notes?.Trim() ?? string.Empty,
                    FileName = file.FileName,
                    FileUrl = $"/uploads/compliance/{dateToken}/{storedName}",
                    UploadedAt = DateTime.UtcNow
                });
            }

            return records;
        }

        private string GetStorePath()
        {
            var appData = Path.Combine(Directory.GetCurrentDirectory(), "App_Data");
            Directory.CreateDirectory(appData);
            return Path.Combine(appData, "compliance_documents.json");
        }

        private List<ComplianceDocumentRecord> LoadRecords()
        {
            var path = GetStorePath();
            if (!System.IO.File.Exists(path))
            {
                return new List<ComplianceDocumentRecord>();
            }

            var json = System.IO.File.ReadAllText(path);
            if (string.IsNullOrWhiteSpace(json))
            {
                return new List<ComplianceDocumentRecord>();
            }

            return JsonSerializer.Deserialize<List<ComplianceDocumentRecord>>(json) ?? new List<ComplianceDocumentRecord>();
        }

        private void Persist(List<ComplianceDocumentRecord> records)
        {
            var json = JsonSerializer.Serialize(records, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(GetStorePath(), json);
        }

        public class UploadComplianceDocumentRequest
        {
            public string OrganizationName { get; set; }
            public string SchoolName { get; set; }
            public string BuildingName { get; set; }
            public string DocumentType { get; set; }
            public string PermitNumber { get; set; }
            public string IssuingAgency { get; set; }
            public string ExpiresAt { get; set; }
            public string RequirementId { get; set; }
            public string Notes { get; set; }
            public List<IFormFile> Files { get; set; } = new();
        }

        public class ComplianceDocumentRecord
        {
            public string OrganizationName { get; set; }
            public string SchoolName { get; set; }
            public string BuildingName { get; set; }
            public string DocumentType { get; set; }
            public string PermitNumber { get; set; }
            public string IssuingAgency { get; set; }
            public string ExpiresAt { get; set; }
            public string RequirementId { get; set; }
            public string Notes { get; set; }
            public string FileName { get; set; }
            public string FileUrl { get; set; }
            public DateTime UploadedAt { get; set; }
        }
    }
}
