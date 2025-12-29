function AdminPlanActions(props) {``
    return (
        <div className='flex flex-col gap-2 rounded-2xl '>
            <button className="bg-black rounded-xl p-2 text-white" onClick={props.onEdit}>Edit</button>
            <button className="bg-red-400 rounded-xl p-2 text-white" onClick={props.onDelete}>Delete</button>
        </div>
    )
}
export default AdminPlanActions