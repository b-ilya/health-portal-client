import { Fragment } from 'react'
import { DraftFunction, useImmer } from 'use-immer'

interface PatientData {
    id: string
    firstName: string
    lastName: string
    birthday: string
    sex: string
    country: string
    state: string
    city: string
    streetAddress: string
    zip: string
    deleted: boolean
}

interface PatientsState {
    patients: PatientData[]
    selectedPatientId: string | null
    patientEditEnabled: boolean
}

const emptyPatients: PatientData[] = []
const dataPatients: PatientData[] = [
    {
        id: 'f32r3390r0923ir092ie0392ri23rf3',
        firstName: 'Superman',
        lastName: 'Kryptonian',
        birthday: '1950/02/14',
        sex: 'male',
        country: 'US',
        state: 'NY',
        city: 'Smallwille',
        streetAddress: '1, Super str.',
        zip: '1415',
        deleted: false
    },
    
    {
        id: '92ie0392ri23rf3f32r3390r0923ir0',
        firstName: 'Superman Jr.',
        lastName: 'Kryptonian',
        birthday: '1950/02/14',
        sex: 'male',
        country: 'US',
        state: 'NY',
        city: 'Smallwille',
        streetAddress: '1, Super str.',
        zip: '55123',
        deleted: false
    },
    {
        id: '0r0923ir092ie0392ri23rf3f32r339',
        firstName: 'Superman Sr.',
        lastName: 'Kryptonian',
        birthday: '1950/02/14',
        sex: 'male',
        country: 'US',
        state: 'NY',
        city: 'Smallwille',
        streetAddress: '1, Super str.',
        zip: '88123',
        deleted: false
    },
    {
        id: 'i23rf3f32r3390r0923ir092ie0392r',
        firstName: 'Superman Dog',
        lastName: 'Kryptonian',
        birthday: '1950/02/14',
        sex: 'male',
        country: 'US',
        state: 'NY',
        city: 'Smallwille',
        streetAddress: '1, Super str.',
        zip: '-',
        deleted: false
    }
]

const Patients: React.FC<void> = () => {

    const [state, setState] = useImmer<PatientsState>({
    
        patients: dataPatients,
        selectedPatientId: null,
        patientEditEnabled: false
    })

    function startEdit(): void {
    
        setState(s => { s.patientEditEnabled = true })
    }

    function cancelEdit(): void {
    
        setState(s => { s.patientEditEnabled = false})
    }

    function selectedPatient(): PatientData | undefined {
        return state.patients.find(patient => { 
            return patient.id == state.selectedPatientId 
        })
    }

    function select(patientId: string) : void {

        setState(s => { s.selectedPatientId = patientId })
    }

    function openCreateForm(): void {
        setState(s => {
            s.selectedPatientId = null
            s.patientEditEnabled = true
        })
    }

    return (<>
        <PatientList patients={state.patients} onPatientSelect={select} onAddPatient={openCreateForm} />
        <PatientDetails patient={selectedPatient()} />
    </>)
}

interface PatientListProps {
    patients: PatientData[]
    onPatientSelect: (patientId: string) => void
    onAddPatient: () => void
}

const PatientList: React.FC<PatientListProps> = ({patients, onPatientSelect, onAddPatient}) => {
    if (!patients.length) 
        return <EmptyList message='No patients added' buttonCation='Add patient' onButtonClick={onAddPatient}/>
    else {
        return (
            <ul>
                {patients.map(patient => (
                    <PatientCard key={patient.id} patient={patient} onSelect={onPatientSelect}/>
                ))}
            </ul>
        )
    }
}

interface EmptyListProps {
    message: string,
    buttonCation: string,
    onButtonClick: () => void
}
const EmptyList: React.FC<EmptyListProps> = ({message, buttonCation, onButtonClick}) => {
    return <Fragment>
        <div>{message}</div>
        <button onClick={onButtonClick}>{buttonCation}</button>
    </Fragment>
}


interface PatientCardProps {

    patient: PatientData,
    onSelect: (patientId: string) => void
}

const PatientCard: React.FC<PatientCardProps> = ({patient, onSelect}) => {
    
    return <Fragment>
        <li onClick={() => onSelect(patient.id)}>
            <h3>{patient.firstName} {patient.lastName}</h3>
            {patient.birthday}, {patient.sex}
            
        </li>
    </Fragment>
}

interface PatientDetailsRowProps {
    label: string,
    value: string
}
const PatientDetailsRow: React.FC<PatientDetailsRowProps> = ({label, value}) => {
    return <tr>
        <td>{label}</td><td>{value}</td>
    </tr>
}

interface PatientDetailsProps {
    patient?: PatientData
}
const PatientDetails: React.FC<PatientDetailsProps> = ({patient}) => {
    
    if (!patient) return <Fragment />

    return (
        <table>
            <PatientDetailsRow label='Name:' value={patient.firstName + ' ' +  patient.lastName} />
            <PatientDetailsRow label='Birthday:' value={patient.birthday} />
            <PatientDetailsRow label='Sex:' value={patient.sex} />
            <PatientDetailsRow label='Address:' value={patient.streetAddress} />
            <PatientDetailsRow label='City:' value={patient.city} />
            <PatientDetailsRow label='State:' value={patient.state} />
            <PatientDetailsRow label='Country:' value={patient.country} />
            <PatientDetailsRow label='Zipcode:' value={patient.zip} />
        </table>
    )
}

export default Patients