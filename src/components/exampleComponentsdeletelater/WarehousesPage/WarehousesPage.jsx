import "./WarehousesPage.scss";
import { useDeleteModal } from "../../hooks/useDeleteModal.js"
import TableWarehouses from "../../components/TablesWarehouses/TablesWarehouses.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

const WarehousesPage = ({ warehouses, setWarehouses }) => {

    const { modalOpen, deleteItem, openDeleteModal, closeDeleteModal, confirmDelete } =
        useDeleteModal(setWarehouses, "warehouses");

    return (
        <section className="warehouses">
            <TableWarehouses warehouses={warehouses} setWarehouses={setWarehouses} openDeleteModal={openDeleteModal} />
            {modalOpen && deleteItem && (
                <DeleteModal
                    deleteItem={deleteItem.warehouse_name}
                    variant="warehouse"
                    onCancel={closeDeleteModal}
                    onConfirm={confirmDelete}
                />
            )}
        </section>
    );
};

export default WarehousesPage;