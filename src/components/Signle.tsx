import React from 'react'
import Typography from '@material-ui/core/Typography'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import{useParams} from 'react-router-dom'

const Signle = (props:any) => {
	let { id } = useParams()
    console.log(props)
    return (
        <div>Single Page {id}</div>
    )
}

export default Signle