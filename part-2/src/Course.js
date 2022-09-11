import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const Course = ({ course }) => (
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course
