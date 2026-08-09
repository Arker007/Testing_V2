import {
  LayoutDashboard,
  Package,
  Tags,
  Mail,
  FileText,
  BookOpen,
  Settings,
} from "lucide-react";

export const NAV_ITEMS = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/products", icon: Package, label: "Products" },
  { path: "/admin/categories", icon: Tags, label: "Categories" },
  { path: "/admin/inquiries", icon: Mail, label: "Inquiries" },
  { path: "/admin/content", icon: FileText, label: "Site Content" },
  { path: "/admin/catalog", icon: BookOpen, label: "Catalog Generator" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];
