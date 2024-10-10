import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import '@/styles/Table.css'

import {ProgramCategoryForm, ProgramForm, ProgramDeleteForm, ProgramCategoryDeleteForm} from '../forms/ProgramForms';
import TextBlock from '../TextBlock';
// MUI GENERATED CODE

function ProgramRow(props) {

    const {program, category} = props

    const [isModalEditProgramOpen, setIsModalEditProgramOpen] = React.useState(false)
    const [isModalDeleteProgramOpen, setIsModalDeleteProgramOpen] = React.useState(false)

    const openModalEditProgram = () => {
        setIsModalEditProgramOpen(true)
    }

    const closeModalEditProgram = () => {
        setIsModalEditProgramOpen(false)
    }

    const openModalDeleteProgram = () => {
        setIsModalDeleteProgramOpen(true)
    }

    const closeModalDeleteProgram = () => {
        setIsModalDeleteProgramOpen(false)
    }

    return (
        <React.Fragment>
            {isModalEditProgramOpen && (
                <Dialog open={isModalEditProgramOpen} onClose={closeModalEditProgram}>
                    <DialogTitle>Редагувати програму</DialogTitle>
                    <DialogContent>
                        <ProgramForm category={category} data={program} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalEditProgram}>Закрити</Button>
                    </DialogActions>
                </Dialog>
            )}

            {isModalDeleteProgramOpen && (
                <Dialog open={isModalDeleteProgramOpen} onClose={closeModalDeleteProgram}>
                    <DialogTitle>Видалити програму?</DialogTitle>
                    <DialogContent>
                        <ProgramDeleteForm categoryId={category._id} program={program} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalDeleteProgram}>Закрити</Button>
                    </DialogActions>
                </Dialog>
            )}

            <TableRow key={program.name}>
                <TableCell component="th" scope="row">
                    {program.name}
                </TableCell>
                <TableCell ><TextBlock text={program.description} max={100} /></TableCell>
                <TableCell >{program.type}</TableCell>
                <TableCell >{program.numberOfLessons}</TableCell>
                <TableCell >{program.lessonDuration}</TableCell>
                <TableCell >{program.coursePrice}</TableCell>
                <TableCell align="right">
                    <button className='table-button-events' onClick={openModalEditProgram}><EditIcon /></button>
                    <button className='table-button-events delete' onClick={openModalDeleteProgram}><DeleteIcon /></button>
                </TableCell>
            </TableRow>
        </React.Fragment>
        
    )
}

function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    // modals

    const [isModalCreateProgramOpen, setIsModalCreateProgramOpen] = React.useState(false)
    const [isModalEditCategoryOpen, setIsModalEditCategoryOpen] = React.useState(false)
    const [isModalDeleteCategoryOpen, setIsModalDeleteCategoryOpen] = React.useState(false)

    const openModalCreateProgram = () => {
        setIsModalCreateProgramOpen(true)
    }

    const closeModalCreateProgram = () => {
        setIsModalCreateProgramOpen(false)
    }

    const openModalEditCategory = () => {
        setIsModalEditCategoryOpen(true)
    }

    const closeModalEditCategory = () => {
        setIsModalEditCategoryOpen(false)
    }

    const openModalDeleteCategory = () => {
        setIsModalDeleteCategoryOpen(true)
    }

    const closeModalDeleteCategory = () => {
        setIsModalDeleteCategoryOpen(false)
    }


    return (
        <React.Fragment>
            {/* Створити нову програму */}
            {isModalCreateProgramOpen && (
                <Dialog open={isModalCreateProgramOpen} onClose={closeModalCreateProgram}>
                    <DialogTitle>Додати програму</DialogTitle>
                    <DialogContent>
                        <ProgramForm category={row} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalCreateProgram}>Закрити</Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Редагувати категорію */}
            {isModalEditCategoryOpen && (
                <Dialog open={isModalEditCategoryOpen} onClose={closeModalEditCategory}>
                    <DialogTitle>Редагувати категорію</DialogTitle>
                    <DialogContent>
                        <ProgramCategoryForm category={row} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalEditCategory}>Закрити</Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Видалити категорію */}
            {isModalDeleteCategoryOpen && (
                <Dialog open={isModalDeleteCategoryOpen} onClose={closeModalDeleteCategory}>
                    <DialogTitle>Видалити категорію</DialogTitle>
                    <DialogContent>
                        <ProgramCategoryDeleteForm category={row} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalDeleteCategory}>Закрити</Button>
                    </DialogActions>
                </Dialog>
            )}

            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.categoryName}
                </TableCell>
                <TableCell><TextBlock text={row.description} max={200} /></TableCell>
                <TableCell align="right">
                    <button className='table-button-events' onClick={openModalEditCategory}><EditIcon /></button>
                    <button className='table-button-events delete' onClick={openModalDeleteCategory}><DeleteIcon /></button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} style={{ backgroundColor: "#f7f7f7" }} timeout="auto" >
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Програми
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Назва програми</b></TableCell>
                                        <TableCell><b>Опис програми</b></TableCell>
                                        <TableCell><b>Тип</b></TableCell>
                                        <TableCell><b>Кількість занять</b></TableCell>
                                        <TableCell><b>Тривалість заняття</b></TableCell>
                                        <TableCell><b>Ціна курсу</b></TableCell>
                                        <TableCell align="right"><b>Дії</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.programs.map((programsRow) => (
                                        <ProgramRow program={programsRow} category={row} />
                                    ))}
                                    <TableCell><button onClick={openModalCreateProgram}><AddIcon /></button></TableCell>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        programs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                numberOfLessons: PropTypes.string.isRequired,
                lessonDuration: PropTypes.string.isRequired,
                coursePrice: PropTypes.number.isRequired,
                _id: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default function ProgramCollapsibleTable(props) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    return (
        <React.Fragment>
            {isModalOpen && (
                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>Додати категорію</DialogTitle>
                    <DialogContent>
                        <ProgramCategoryForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>Закрити</Button>
                    </DialogActions>
                </Dialog>
            )}
            <TableContainer component={Paper} >
                <Table aria-label="collapsible table" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell><b>Назва категорії</b></TableCell>
                            <TableCell><b>Опис категорії</b></TableCell>
                            <TableCell align="right"><b>Дії</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                        <TableCell><button onClick={openModal}><AddIcon /></button></TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>

    );
}