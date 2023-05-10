import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices} from "../../data/mockData";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
//import InvoiceView from "./invoiceView";
// import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/invoiceView`; 
      navigate(path);
    }

    const columns = [
      { field: "id", headerName: "ID"},
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                ${params.row.cost}
            </Typography>
        )
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
      },
      {
        field: "paymentStatus",
        headerName: "Payment Status",
        flex: 1,
        renderCell: ({ row: { invoicePaid } }) => {
            return (
              <Button
              sx={{ 
                width: "60%",
                // display: "flex",
                alignItems: "center",
                justifyContent: "center",
                m: "0 auto",
                p: "5px",
                backgroundColor:  invoicePaid ? "rgba(51, 214, 160, 0.1)" : "rgba(255, 145, 0, 0.1)",
                ":hover": {
                  bgcolor: colors.primary[700],
                },
              }}
              variant="contained"
              onClick={routeChange}
              >
                  <Box width="10%"
                    height="10%"
                    m="auto 6px"
                    p="6px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={
                      invoicePaid === true ? colors.greenAccent[550] : colors.yellowAccent[600]
                    }
                    borderRadius="50%"></Box>
                    <Typography color={colors.grey[100]} >
                      { invoicePaid ? 'Paid' : 'Pending' }
                    </Typography>
              </Button>
            );
        }
      },
    ];

    return (
      <Box m="20px">
        <Header title="INVOICES" subtitle="List of Invoces and Balances" />
        <Box
          m="40px 0 0 0 "
          height="75vh"
          sx={{
            "& .MuiDataGrig-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: colors.blueAccent[700],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={mockDataInvoices}
            columns={columns}
          />
        </Box>
      </Box>
    );
}

export default Invoices;