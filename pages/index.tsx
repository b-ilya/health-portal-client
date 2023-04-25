import { Fragment } from 'react'
import { DraftFunction, useImmer } from 'use-immer'
import useSWR from 'swr'
import { METHODS } from 'http'

interface Address {
    streetAddress: string
    city: string
    country: string
    state?: string
    zip? : string
}

interface PatientData {
    id: string
    firstName: string
    lastName: string
    birthDate: string
    sex: string
    address: Address
    deleted? : boolean
}

interface PatientListData {
    patients: PatientData[]
    totalCount: number
    count: number
    offset: number
    hasMore: false
}

interface PatientsState {
    selectedPatientId: string | null
    patientEditEnabled: boolean
}

const emptyPatients: PatientData[] = []
const dataPatients: PatientData[] = [
    {
        id: 'f32r3390r0923ir092ie0392ri23rf3',
        firstName: 'Superman',
        lastName: 'Kryptonian',
        birthDate: '1950/02/14',
        sex: 'male',
        address: {
            country: 'US',
            state: 'NY',
            city: 'Smallwille',
            streetAddress: '1, Super str.',
            zip: '1415'
        },
        deleted: false
    },
    
    {
        id: '92ie0392ri23rf3f32r3390r0923ir0',
        firstName: 'Superman Jr.',
        lastName: 'Kryptonian',
        birthDate: '1950/02/14',
        sex: 'male',
        address: {
            country: 'US',
            state: 'NY',
            city: 'Smallwille',
            streetAddress: '1, Super str.',
            zip: '1415'
        },
        deleted: false
    },
    {
        id: '0r0923ir092ie0392ri23rf3f32r339',
        firstName: 'Superman Sr.',
        lastName: 'Kryptonian',
        birthDate: '1950/02/14',
        sex: 'male',
        address: {
            country: 'US',
            state: 'NY',
            city: 'Smallwille',
            streetAddress: '1, Super str.',
            zip: '1415'
        },
        deleted: false
    },
    {
        id: 'i23rf3f32r3390r0923ir092ie0392r',
        firstName: 'Superman Dog',
        lastName: 'Kryptonian',
        birthDate: '1950/02/14',
        sex: 'male',
        address: {
            country: 'US',
            state: 'NY',
            city: 'Smallwille',
            streetAddress: '1, Super str.',
            zip: '1415'
        },
        deleted: false
    }
]

const Patients: React.FC<void> = () => {

    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${process.env.DEV_TOKEN}`);

    const patientsFetcher = () => fetch(`${process.env.HEALTH_PORTAL_SERVER_URL}/patients`, {
        method: 'GET',
        headers: headers
    }).then(res => res.json()) as Promise<PatientListData>;

    const {data: patientsList, error, isLoading} = useSWR<PatientListData>('/patients', patientsFetcher, {
        revalidateOnFocus: false
    })

    const [state, setState] = useImmer<PatientsState>({
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
        return patientsList?.patients.find(patient => { 
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
        <PatientList 
            patients={ error || isLoading || !patientsList ? emptyPatients : patientsList?.patients } 
            onPatientSelect={select} onAddPatient={openCreateForm} />
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
        return <EmptyList />
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

const EmptyList: React.FC<{}> = () => {
    return <Fragment />
}


interface PatientCardProps {

    patient: PatientData,
    onSelect: (patientId: string) => void
}

const PatientCard: React.FC<PatientCardProps> = ({patient, onSelect}) => {
    
    return <Fragment>
        <li onClick={() => onSelect(patient.id)}>
            <h3>{patient.firstName} {patient.lastName}</h3>
            {patient.birthDate}, {patient.sex}
            
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
        <table><tbody>
            <PatientDetailsRow label='Name:' value={patient.firstName + ' ' +  patient.lastName} />
            <PatientDetailsRow label='Birthday:' value={patient.birthDate} />
            <PatientDetailsRow label='Sex:' value={patient.sex} />
            <PatientDetailsRow label='Address:' value={patient.address.streetAddress} />
            <PatientDetailsRow label='City:' value={patient.address.city} />
            <PatientDetailsRow label='State:' value={patient.address.state || '-'} />
            <PatientDetailsRow label='Country:' value={patient.address.country} />
            <PatientDetailsRow label='Zipcode:' value={patient.address.zip || '-'} />
        </tbody></table>
    )
}

export default Patients