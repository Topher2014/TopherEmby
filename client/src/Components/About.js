import {Container, Typography} from "@mui/material"
import Pete from '../Images/Pete.jpg'

function About(){
    return (
    <Container>
        <Typography> What is TopherEmby? </Typography>
        <Typography component='p' variant='secondary' > While the name is TopherEMBY, this site is open to all users of Emby, Jellyfin, Plex, Kodi, or any other media organizers/players. </Typography>
        <Typography component='p' variant='secondary' > TopherEmby was created for those of us who share our media library with friends and family, 
            for those friends and family to have a better way to make requests.
            Gone are the days of keeping track of requests in text messages and on sticky-notes;
            now you and your loved ones can create an account here and streamline.  </Typography>
        <Typography component='p' variant='secondary' > "Topher, this sounds a lot like Ombi." Yep, but I didn't know that existed when I started making this. </Typography>
        <img src={Pete} alt='Pete Campbell' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} />
        <br/><br/><br/><br/>
        <Typography> Upcoming Features </Typography>
        <Typography component='p' variant='secondary' >- Optimize a bit for mobile  </Typography>
        <Typography component='p' variant='secondary' >- Request history. In addition to requests being able to be deleted, they
        will be able to be removed and marked as downloaded. Requests that are deleted will allow an explanation why. </Typography>
        <Typography component='p' variant='secondary' >- Admin privileges for group creators. That part is actually pretty easy and mostly done, 
        but any admin privilege also needs the corresponding ability for a user to request that the admin perform that task. </Typography>
        <Typography component='p' variant='secondary' >- Disallowing duplicate requests. This is also easy, and will be implemented alongside request history.  </Typography>
        <Typography component='p' variant='secondary' >- Email notifications for both requests and request fulfillments.  </Typography>
        <Typography component='p' variant='secondary' >- Allow friends to be added to groups from the friends page.  </Typography>
        {/* <Typography component='p' variant='secondary' >-   </Typography> */}
    </Container>
    )
}

export default About