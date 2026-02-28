import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch.js";
import { useEffect } from "react";
import Iconography from "../Iconography/Iconography";
import TableCard from "../TableCard/TableCard.jsx";
import TableCardField from "../TableCard/TableCardField.jsx";
import TableCardActions from "../TableCard/TableCardActions.jsx";
import Typography from "../Typography/Typography.jsx";
import TablesHeader from "../TablesHeader/TablesHeader.jsx";
import TableRowHeader from "../TableRowHeader/TableRowHeader.jsx";
import "./TablesWarehouses.scss"

const TableWarehouses = ({ warehouses, setWarehouses, openDeleteModal }) => {

    const navigate = useNavigate();
    const goToAddWarehouse = () => navigate("/warehouses/form/add");

    const searchKeys = ["warehouse_name", "address", "contact_name", "contact_email", "contact_phone"];
    const { searchString, setSearchString, filteredArray } = useSearch(warehouses, searchKeys);

    useEffect(() => {
        setSearchString("");
    }, []);

    if (!warehouses || warehouses.length === 0) {
        return <p>No warehouses available.</p>;
    }

    const headers = [
        { label: "WAREHOUSE", key: "warehouse_name", flex: 1.25 },
        { label: "ADDRESS", key: "address", flex: 1 },
        { label: "CONTACT NAME", key: "contact_name", flex: 1 },
        { label: "CONTACT INFORMATION", key: "contact_email", flex: 1.5 } //key is for sorting
    ];

    return (
        <div className="warehouse-table-wrapper">
            <TablesHeader headerText="Warehouses" buttonText="+ Add New Warehouse" onButtonClick={goToAddWarehouse}
                searchString={searchString} setSearchString={setSearchString} />
            <TableRowHeader headers={headers} data={warehouses} setData={setWarehouses} />
            <div className="warehouse-table">
                {Array.isArray(filteredArray) && filteredArray.map((warehouse) => (
                    <TableCard key={warehouse.id} className="warehouse-table__card">
                        <TableCardField label="WAREHOUSE" className="card__field--alt warehouse-table__warehouse">
                            <Link to={`/warehouses/${warehouse.id}`} className="warehouse-table__link">
                                <Typography variant="p2" className="card__value-text">{warehouse.warehouse_name}</Typography>
                                <Iconography name="chevronRight" className="warehouse-link__icon" />
                            </Link>
                        </TableCardField>

                        <TableCardField label="CONTACT NAME" className="warehouse-table__name">
                            <Typography variant="p2" className="card__value-text">
                                {warehouse.contact_name}
                            </Typography>
                        </TableCardField>

                        <TableCardField label="ADDRESS" className="warehouse-table__address">
                            <Typography variant="p2" className="card__value-text">
                                {warehouse.address}, {warehouse.city}, {warehouse.country}
                            </Typography>
                        </TableCardField>

                        <TableCardField label="CONTACT INFORMATION" className="warehouse-table__contact">
                            <Typography variant="p2" className="card__value-text">{warehouse.contact_phone}</Typography>
                            <Typography variant="p2" className="card__value-text">{warehouse.contact_email}</Typography>
                        </TableCardField>

                        <TableCardActions
                            editTo={`/warehouses/form/${warehouse.id}/edit`}
                            onDelete={() => openDeleteModal(warehouse)}
                            className="warehouse-table__actions"
                        />
                    </TableCard>
                ))}
            </div>
        </div>
    );
};

export default TableWarehouses;
