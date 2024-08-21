const validationProductForm = (formData) => {
  let errors = {};

  // Validación de nombre
  if (formData.nombre && !formData.nombre.trim()) {
    errors.nombre = "El nombre es requerido";
  }

  // Validación de categoría
  if (formData.categoria && !formData.categoria.trim()) {
    errors.categoria = "La categoría es requerida";
  }

  // Validación de tamaño
  if (formData.tamaño && !formData.tamaño.trim()) {
    errors.tamaño = "El tamaño es requerido";
  }

  // Validación de cantidad
  if (formData.cantidad && !formData.cantidad.trim()) {
    errors.cantidad = "La cantidad es requerida";
  }

  // Validación de color
  if (formData.color && !formData.color.trim()) {
    errors.color = "El color es requerido";
  }

  const sanitizedPrice = formData.precio.replace(/,/g, '');

  if (formData.precio && !sanitizedPrice) {
    errors.precio = "El precio es requerido";
  } else if (formData.precio && !sanitizedPrice.trim()) {
    errors.precio = "El precio no puede ser solo espacios";
  } else if (formData.precio && !/^\d+(\.\d{1,2})?$/.test(sanitizedPrice)) {
    errors.precio =
      "El precio debe ser un número positivo con hasta dos decimales";
  } else if (parseFloat(sanitizedPrice) <= 0) {
    errors.precio = "El precio debe ser mayor a 0";
  }

  return errors;
};

export default validationProductForm;
