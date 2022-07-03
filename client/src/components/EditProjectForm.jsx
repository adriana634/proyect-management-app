import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export default function EditProjectForm(props) {
    const navigate = useNavigate();

    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [status, setStatus] = useState('new');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: props.id, name, description, status },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECT, variables: { id: props.id } }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !status) {
            return alert("Please fill in all fields");
        }

        updateProject(name, description, status);
    }

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
            <form onSubmit={ onSubmit }>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}