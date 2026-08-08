# SmartHire AI — Backend/Frontend Contract Fix TODO

## Goal
Make resume/job list, details, and delete pages work end-to-end by exposing the missing backend endpoints the frontend requires, and enabling the existing frontend delete functions.

## Steps
- [x] 1. Add `delete()` to `src/database/resume_repository.py`
- [x] 2. Add `delete()` to `src/database/job_repository.py`
- [x] 3. Add `GET /resume`, `GET /resume/{resume_id}`, `DELETE /resume/{resume_id}` to `src/api/routers/resume_router.py`
- [x] 4. Add `GET /job` and `DELETE /job/{job_id}` to `src/api/routers/job_router.py`
- [x] 5. Enable `deleteResume` in `FrontEnd/project/src/api/resumeApi.ts`
- [x] 6. Enable `deleteJob` and harden `getJobs` in `FrontEnd/project/src/api/jobApi.ts`
- [x] 7. Restart backend and verify all endpoints return 200
- [x] 8. Run TypeScript build check
