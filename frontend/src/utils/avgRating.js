export default function GetAvgRating(ratingArr) {
  // Guard: handle undefined/null/non-array or empty arrays
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) return 0

  // Sum numeric ratings only; coerce safely
  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    const val = Number(curr?.rating)
    return acc + (Number.isFinite(val) ? val : 0)
  }, 0)

  const count = ratingArr.length
  if (count === 0) return 0

  // Round to 1 decimal place, always return a finite number
  const avg = totalReviewCount / count
  if (!Number.isFinite(avg)) return 0

  return Number(avg.toFixed(1))
}
