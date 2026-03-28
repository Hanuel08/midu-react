import { useState } from 'react'

import './App.css'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobListings } from './components/JobListings.jsx'
import { Pagination } from './components/Pagination.jsx'


import jobsData from "./data.json"
//import JobCard from "./components/JobCard"

const RESULTS_PER_PAGE = 5

function App() {
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    ExperienceLevel: ""
  })
  const [textToFilter, setTextToFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const jobsFilteredByFilters = jobsData.filter(job => {
    return (
      (filters.technology === '' || job.data.technology.toLowerCase() === filters.technology.toLowerCase())
    )
  })

  const jobsWithtextFilter = textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    })

  const totalPages = Math.ceil(jobsWithtextFilter.length / RESULTS_PER_PAGE)

  const pagedResults = jobsWithtextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  return (
    <>
      <Header />

      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

        <section>
          <JobListings jobs={pagedResults} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>

      </main>

      <Footer />
    </>
  )
}

export default App
