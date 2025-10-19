import React from 'react'

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange = () => {} }) => {
  if (totalPages <= 1) return null

  const goto = (p) => {
    const page = Math.max(1, Math.min(totalPages, p))
    if (page !== currentPage) onPageChange(page)
  }

  const prev = () => goto(currentPage - 1)
  const next = () => goto(currentPage + 1)
  const first = () => goto(1)
  const last = () => goto(totalPages)

  // build a small sliding window of pages around currentPage
  const delta = 2
  let start = Math.max(1, currentPage - delta)
  let end = Math.min(totalPages, currentPage + delta)

  // try to keep window size consistent when near edges
  if (currentPage - start < delta) {
    end = Math.min(totalPages, end + (delta - (currentPage - start)))
  }
  if (end - currentPage < delta) {
    start = Math.max(1, start - (delta - (end - currentPage)))
  }

  const pages = []
  for (let p = start; p <= end; p++) pages.push(p)

  const btnBase = 'px-3 py-1 rounded mx-1 border bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300'
  const btnActive = 'bg-blue-600 text-white border-blue-600'

  return (
    <div className='flex items-center justify-center gap-2 my-6'>
      <button
        onClick={first}
        disabled={currentPage === 1}
        aria-label='First page'
        className={`px-3 py-1 rounded mx-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
      >
        «
      </button>

      <button
        onClick={prev}
        disabled={currentPage === 1}
        aria-label='Previous page'
        className={`px-3 py-1 rounded mx-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
      >
        ‹
      </button>

      {start > 1 && (
        <>
          <button onClick={() => goto(1)} className={btnBase}>1</button>
          {start > 2 && <span className='px-2'>…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goto(p)}
          aria-current={p === currentPage ? 'page' : undefined}
          className={`${btnBase} ${p === currentPage ? btnActive : ''}`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className='px-2'>…</span>}
          <button onClick={() => goto(totalPages)} className={btnBase}>{totalPages}</button>
        </>
      )}

      <button
        onClick={next}
        disabled={currentPage === totalPages}
        aria-label='Next page'
        className={`px-3 py-1 rounded mx-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
      >
        ›
      </button>

      <button
        onClick={last}
        disabled={currentPage === totalPages}
        aria-label='Last page'
        className={`px-3 py-1 rounded mx-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
      >
        »
      </button>
    </div>
  )
}

export default Pagination
