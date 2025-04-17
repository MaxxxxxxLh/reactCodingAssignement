import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";


export const useProductData = (productId) => {
  const [productData, setProductData] = useState({});
  const [groups, setGroups] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(productId);
        const data = response.data;
        setProductData(data);
        setAdverts(data.adverts || []);
        const groupData = data?.declinationGroupsFromMFP?.groups || [];
        setGroups(groupData);

        if (groupData[0]?.groupKeyValue) {
          setSelectedFilter(groupData[0].groupKeyValue);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const currentGroup = groups.find(
    (group) => group.groupKeyValue === selectedFilter
  );
  const advertIdsInGroup = currentGroup?.groupProducts.map((p) => p.id) || [];

  const filteredAdverts =
  groups.length > 0
    ? adverts.filter((advert) =>
        advertIdsInGroup.includes(advert.productId)
      )
    : adverts;
  const selectedImageUrl = currentGroup?.imgUrl || productData?.imagesUrls?.[0];

  return {
    loading,
    error,
    productData,
    groups,
    selectedFilter,
    setSelectedFilter,
    currentGroup,
    filteredAdverts,
    selectedImageUrl,
  };
};
