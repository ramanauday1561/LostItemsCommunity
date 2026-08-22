import ItemRegistry from '../../../AfterLoginComponents/ItemRegistry';

// The lost and found registries were two 387-line copies of the same screen.
// Both now render the shared component; everything that differs is in its COPY map.
function SearchLostItems() {
    return <ItemRegistry kind="lost" />;
}

export default SearchLostItems;
