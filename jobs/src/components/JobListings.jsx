import { JobCard } from "./JobCard"

export function JobListings({ jobs }) {
    return (
        <>
          <h2>Resultados de búsqueda</h2>

          <div className="jobs-listings">
            {jobs.map(job => (
              <JobCard key={job.id} job={job}  />
            ))}
          </div>
        </>
    )
}