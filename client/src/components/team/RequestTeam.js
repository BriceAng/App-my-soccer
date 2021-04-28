import React from 'react';
import { useSelector } from 'react-redux';

const RequestTeam = ({ userData }) => {
    function ListItem(props) {
        return <li>{props.value}</li>
    }

    function RequestList(props) {
        const teams = props.teams;
        const listItems = teams.map((team) => {
            for (let i = 0; i < userData.waitList.length; i++) {
                if (userData.waitList[i] === team._id) {
                    return <ListItem key={team._id} value={team.name} />
                }
            }
            return null;
        }
        );
        return (
            <ul>
                {listItems}
            </ul>
        );
    }

    const teamsData = useSelector((state) => state.teamsReducer);

    return (
        <RequestList teams={teamsData} />
    )
};

export default RequestTeam;