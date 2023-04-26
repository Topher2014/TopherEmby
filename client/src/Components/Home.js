import { Container, Typography } from "@mui/material"

function Home(){
    return (
    <Container>
        <Typography> Welcome to TopherEmby! </Typography>
        <br/><br/><br/><br/>
        <Typography fontSize={24}> If you're new here, create a group so you can start adding requests. </Typography>
        <Typography fontSize={24}> People on your friends list can be added to your groups. You can browse existing users to add to your friends list. </Typography>
        <br/><br/><br/><br/>
        <Typography fontSize={24}> Check the "About" section to learn what TopherEmby is all about and to see features that are currently in the works. </Typography>
    </Container>
    )
}

export default Home