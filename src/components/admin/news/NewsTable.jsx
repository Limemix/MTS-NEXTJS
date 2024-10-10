"use client";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextBlock from '../TextBlock';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { NewsForm, NewsDeleteForm } from '../forms/NewsForm';
import '@/styles/Table.css'

const NewsRow = ({data}) => {

  const [isModalEditNewsOpen, setIsModalEditNewsOpen] = React.useState(false)
  const [isModalDeleteNewsOpen, setIsModalDeleteNewsOpen] = React.useState(false)

  const openModalEditNews = () => {
    setIsModalEditNewsOpen(true)
  }

  const closeModalEditNews = () => {
    setIsModalEditNewsOpen(false)
  }

  const openModalDeleteNews = () => {
    setIsModalDeleteNewsOpen(true)
  }

  const closeModalDeleteNews = () => {
    setIsModalDeleteNewsOpen(false)
  }

  return (
    <React.Fragment>
      {isModalEditNewsOpen && (
          <Dialog open={isModalEditNewsOpen} onClose={closeModalEditNews}>
              <DialogTitle>Оновити новину</DialogTitle>
              <DialogContent>
                  <NewsForm initialNewsData={data} />
              </DialogContent>
              <DialogActions>
                  <Button onClick={closeModalEditNews}>Закрити</Button>
              </DialogActions>
          </Dialog>
      )}

      {isModalDeleteNewsOpen && (
        <Dialog open={isModalDeleteNewsOpen} onClose={closeModalDeleteNews}>
            <DialogTitle>Видалити новину</DialogTitle>
            <DialogContent>
                <NewsDeleteForm news={data} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModalDeleteNews}>Закрити</Button>
            </DialogActions>
        </Dialog>
      )}

      <TableRow
        key={data.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {data.name}
        </TableCell>
        <TableCell>{data.shortAddress}</TableCell>
        <TableCell>{data.fullAddress}</TableCell>
        <TableCell><TextBlock text={data.description} max={200} /></TableCell>
        <TableCell align="right">
          <button className='table-button-events' onClick={openModalEditNews}><EditIcon /></button>
          <button className='table-button-events delete'onClick={openModalDeleteNews}><DeleteIcon /></button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function NewsTable(props) {
  const {rows} = props
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
              <DialogTitle>Додати новину</DialogTitle>
              <DialogContent>
                  <NewsForm />
              </DialogContent>
              <DialogActions>
                  <Button onClick={closeModal}>Закрити</Button>
              </DialogActions>
          </Dialog>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Назва новини</b></TableCell>
              <TableCell><b>Коротка адреса</b></TableCell>
              <TableCell><b>Повна адреса</b></TableCell>
              <TableCell><b>Опис</b></TableCell>
              <TableCell align="right"><b>Дії</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <NewsRow data={row} />
            ))}
            <TableCell><button onClick={openModal}><AddIcon /></button></TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}