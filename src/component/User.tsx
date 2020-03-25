import React, {ReactNode} from 'react';
import {
    Container,
    Box,
    Grid,
    Paper,
    TextField,
    Button,
    Fade
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {compose} from "recompose";

class User extends React.Component<any> {
    render(): ReactNode {
        return (
            <Fade in>
                <Container maxWidth="md">
                    <Box mt={2}>
                        <Paper>
                            <Box p={2}>
                                <form noValidate autoComplete="off">
                                    <Grid container
                                          direction="column"
                                          spacing={1}
                                    >
                                        <Grid item><TextField fullWidth label="E-mail"/></Grid>
                                        <Grid item><TextField fullWidth label="Имя"/></Grid>
                                        <Grid item><TextField fullWidth label="Фамилия"/></Grid>
                                        <Grid item><TextField fullWidth label="Возраст"/></Grid>
                                    </Grid>
                                    <Box m={2}/>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Button type="submit" variant="contained" color="primary"
                                                    startIcon={<SaveIcon/>}>
                                                Сохранить
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button component={Link} to="/" variant="contained" color="secondary"
                                                    startIcon={<CancelIcon/>}>
                                                Отмена
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </Fade>
        );
    }
}

export default compose(observer)(User);
