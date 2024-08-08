import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import axios from 'axios';

  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  

  const PaginationTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [maintenanceData, setmaintenanceData] = useState([]);

    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getMaintainenceRequest`);
            setmaintenanceData(response.data.status);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
  
    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Maintenance Type</TableCell>
              <TableCell align="center">Engineear Name</TableCell>
              <TableCell align="center">Engineer Contact</TableCell>
              {/* <TableCell align="center">Status</TableCell> */}
              {/* <TableCell align="center">Amount</TableCell> */}
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenanceData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{subscriber.maintainenceType}</TableCell>
                  <TableCell align="center">{subscriber.engineerName}</TableCell>
                  <TableCell align="center">{subscriber.engineerContact}</TableCell>
                  {/* <TableCell align="center">{subscriber.status}</TableCell> */}
                  {/* <TableCell align="center">${subscriber.amount}</TableCell> */}
                  <TableCell align="right">
                    <IconButton>
                      <Icon fontSize="small" color="error">close</Icon>
                    </IconButton>
                    <IconButton>
                      <Icon fontSize="small">check</Icon>
                    </IconButton>
  
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
  
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={maintenanceData.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
    );
  };
  
  export default PaginationTable;
  