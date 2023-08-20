import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import useAppDispatch from "../../hooks/useAppDispatch";
import { updateProduct } from "../../redux/reducers/productsReducer";

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const [updateById, setUpdateById] = useState("");
  const [productName, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [productImages, setProductImages] = useState<{ link: string }[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      updateProduct({
        id: updateById,
        data: {
          productName,
          description,
          price,
          stock,
          productImages,
        },
      })
    );
  };

  return (
    <div className="add-new-product">
      <h2>UpdateProduct</h2>
      <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
            <label htmlFor="updateById">Id of the product:</label>
            <input
              type="string"
              name="updateById"
              id="updateById"
              value={updateById}
              onChange={(e) => setUpdateById(String(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={productName}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Images:</label>
            <input
              type="text"
              id="images"
              name="images"
              value={productImages.join(",")}
              onChange={(e) => setProductImages(e.target.value.split(",").map((link) => ({ link })))}
            />
            </div>
          <div>
            <button type="submit">Update product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
