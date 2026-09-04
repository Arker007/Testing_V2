import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shared/ui";

export const EMPTY_PRODUCT = {
  name: "",
  category: "",
  type: "",
  description: "",
  price: "",
  oldPrice: "",
  discountRate: "",
  moq: "",
  capacity: "",
  dispatch: "",
  applications: "",
  features: [],
  faqs: [
    { question: "What is the minimum order quantity (MOQ)?", answer: "" },
    { question: "What are the available sizes / dimensions?", answer: "" },
    { question: "Can this product be customised?", answer: "" },
    { question: "What is the dispatch timeline after order confirmation?", answer: "" },
  ],
  specifications: {},
  images: [],
  published: true,
};

export function useProductEditor(id, isNew) {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    };
    fetch("/api/categories", { headers })
      .then((r) => r.json())
      .then((c) => setCategories(c.categories || c || []));

    if (!isNew) {
      setLoading(true);
      fetch(`/api/products/${id}`, { headers })
        .then((r) => r.json())
        .then((p) => {
          if (p.error) {
            toast.error("Product not found.");
            navigate("/admin/products");
            return;
          }
          let imgs = [];
          try {
            const a = JSON.parse(p.image);
            const array = Array.isArray(a) ? a : [a];
            imgs = array
              .map((item) => {
                if (item && typeof item === "object") {
                  return { local: item.local || "", url: item.url || "" };
                }
                if (typeof item === "string" && item) {
                  if (item.startsWith("http://") || item.startsWith("https://")) {
                    return { local: "", url: item };
                  }
                  return { local: item, url: "" };
                }
                return { local: "", url: "" };
              })
              .filter((item) => item.local || item.url);
          } catch {
            if (p.image) {
              if (p.image.startsWith("http://") || p.image.startsWith("https://")) {
                imgs = [{ local: "", url: p.image }];
              } else {
                imgs = [{ local: p.image, url: "" }];
              }
            }
          }
          setForm({
            name: p.name || "",
            category: String(p.category || ""),
            type: p.type || "",
            description: p.description || "",
            price: p.price || "",
            oldPrice: p.oldPrice || "",
            discountRate: p.discountRate || "",
            moq: p.moq || "",
            capacity: p.capacity || "",
            dispatch: p.dispatch || "",
            applications: p.applications || "",
            features: Array.isArray(p.features) ? p.features : [],
            faqs:
              Array.isArray(p.faqs) && p.faqs.length > 0
                ? p.faqs
                : EMPTY_PRODUCT.faqs,
            specifications:
              typeof p.specifications === "object"
                ? p.specifications
                : (() => {
                    try {
                      return JSON.parse(p.specifications || "{}");
                    } catch {
                      return {};
                    }
                  })(),
            images: imgs,
            published:
              p.published === null || p.published === undefined
                ? true
                : Number(p.published) !== 0,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id, isNew, navigate, toast]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      "Content-Type": "application/json",
    };
    const moqVal = form.specifications.moq || form.specifications.MOQ || form.moq;
    const capVal =
      form.specifications.capacity ||
      form.specifications.loadCapacity ||
      form.specifications.static ||
      form.capacity;
    const dispVal =
      form.specifications.dispatch || form.specifications.Dispatch || form.dispatch;
    const payload = {
      ...form,
      features: form.features.filter(Boolean),
      image: JSON.stringify(form.images),
      moq: moqVal,
      capacity: capVal,
      dispatch: dispVal,
    };
    const url = isNew ? "/api/products" : `/api/products/${id}`;
    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers,
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(isNew ? "Product created successfully" : "Product saved successfully");
        navigate("/admin/products");
      } else {
        const d = await res.json();
        toast.error(d.error || "Failed to save product.");
      }
    } catch {
      toast.error("A network error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const fd = new FormData();
    files.forEach((file) => fd.append("images", file));
    try {
      const res = await fetch("/api/upload/images", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: fd,
      });
      const data = await res.json();
      if (data.images) {
        const mapped = data.images.map((imgStr) => ({ local: imgStr, url: "" }));
        setForm((prev) => ({ ...prev, images: [...prev.images, ...mapped] }));
        toast.success("Images uploaded successfully");
      }
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSingleImageReplace = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("images", file);
    try {
      const res = await fetch("/api/upload/images", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: fd,
      });
      const data = await res.json();
      if (data.images && data.images[0]) {
        setForm((prev) => {
          const imgs = [...prev.images];
          imgs[index] = { ...imgs[index], local: data.images[0] };
          return { ...prev, images: imgs };
        });
        toast.success("Image replaced successfully");
      }
    } catch {
      toast.error("Replacement image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageUrlChange = (val, index) => {
    setForm((prev) => {
      const imgs = [...prev.images];
      imgs[index] = { ...imgs[index], url: val };
      return { ...prev, images: imgs };
    });
  };

  const handleDeleteImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  const handleMakePrimary = (index) => {
    setForm((prev) => {
      const imgs = [...prev.images];
      const [item] = imgs.splice(index, 1);
      imgs.unshift(item);
      return { ...prev, images: imgs };
    });
  };

  const handleAddBlankImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { local: "", url: "" }],
    }));
  };

  return {
    form,
    setForm,
    categories,
    loading,
    saving,
    uploading,
    setUploading,
    handleSave,
    handleImageUpload,
    handleSingleImageReplace,
    handleImageUrlChange,
    handleDeleteImage,
    handleMakePrimary,
    handleAddBlankImage,
  };
}

export default useProductEditor;
