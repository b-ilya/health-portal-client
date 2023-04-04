const dataPatients = [
    {
        id: 101,
        name: 'Superman'
    },
    {
        id: 102,
        name: 'Shazam'
    },
    {
        id: 103,
        name: 'Batman'
    }
]

export default function Patients() {
    return (<>
        <PatientList />
    </>)
}

function PatientList() {
    return (
        <ul>
            {dataPatients.map(patient => (
                <li key={patient.id}>
                    {patient.name}
                </li>
            ))}
        </ul>
    )
}