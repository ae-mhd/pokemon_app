import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const CustomTable = ({ rows, columns, setMaxPower, setMinPower }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const selectedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    const powerValues = selectedRows.map((row) => row.power)

    useEffect(() => {
        setMaxPower(Math.max(...powerValues))
        setMinPower(Math.min(...powerValues))
    }, [selectedRows])
    return (
        <>

            <TableContainer sx={{ borderRadius: 4, boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.75)' }} >
                <Table aria-label="sticky table" >
                    <TableHead sx={{ background: '#0000000a', }}>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.id}

                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedRows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default CustomTable

