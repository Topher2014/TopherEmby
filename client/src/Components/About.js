import { Container, Typography } from "@mui/material"
import Pete from '../Images/Pete.jpg'

function About(){
    return (
    <Container>
        <Typography> What is TopherEmby? </Typography>
        <Typography fontSize={24}> While the name is TopherEMBY, this site is open to all users of Emby, Jellyfin, Plex, Kodi, or any other media organizers/players. </Typography>
        <Typography fontSize={24}> TopherEmby was created for those of us who share our media library with friends and family, 
            for those friends and family to have a better way to make requests.
            Gone are the days of keeping track of requests in text messages and on sticky-notes;
            now you and your loved ones can create an account here and streamline.  </Typography>
        <Typography fontSize={24}> "Topher, this sounds a lot like Ombi." Yep, but I didn't know that existed when I started making this. </Typography>
        <img src={Pete} alt='Pete Campbell' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} />
        <br/><br/><br/><br/>
        <Typography> Upcoming Features </Typography>
        <Typography fontSize={24}> The first upcoming feature is to finish this section. </Typography>
    </Container>
    )
}

export default About