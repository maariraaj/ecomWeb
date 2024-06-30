
const HomeList = (props) => {

  return (
    <tr key={props.id}>
        <td>{props.date}</td>
        <td>{props.location}</td>
        <td>{props.title}</td>
        <td><button type="button" className="btn btn-info">Buy Tickets</button></td>
    </tr>
  )
}

export default HomeList