import ReportItemForm from '../../../AfterLoginComponents/ReportItemForm';

// The lost and found report pages were two 278-line copies of the same form.
// Both now render the shared component; wording lives in its COPY map.
function ReportLostItem() {
    return <ReportItemForm kind="lost" />;
}

export default ReportLostItem;
