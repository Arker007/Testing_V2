import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/AdminTable.module.css";
import { Input, Button, Alert, Card, useToast } from "@/shared/ui";

export default function AdminSettings() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState(null); 
  const [errorMsg, setErrorMsg] = useState("");
  const toast = useToast();

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setErrorMsg("");
    if (form.next.length < 6) { 
      const err = "New password must be at least 6 characters long.";
      setErrorMsg(err); 
      toast.warning(err);
      return; 
    }
    if (form.next !== form.confirm) { 
      const err = "Passwords do not match.";
      setErrorMsg(err); 
      toast.warning(err);
      return; 
    }

    setStatus("saving");
    try {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
      });
      if (res.ok) { 
        setStatus("success"); 
        setForm({ current: "", next: "", confirm: "" });
        toast.success("Password updated successfully");
      } 
      else { 
        const data = await res.json(); 
        const err = data.error || "Failed to update password. Please check your current password.";
        setErrorMsg(err); 
        setStatus("error"); 
        toast.error(err);
      }
    } catch { 
      const err = "A network error occurred. Please try again.";
      setErrorMsg(err); 
      setStatus("error"); 
      toast.error(err);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.toolbar}>
        <p className={styles.count}>Account Settings</p>
      </div>

      <Card className="max-w-2xl p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-subtle)]">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Icon icon="carbon:password" className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Update Password</h2>
            <p className="text-sm text-[var(--text-muted)]">Enter your current password to set a new password for your account.</p>
          </div>
        </div>

        {status === "success" && (
          <Alert status="success" variant="subtle" className="mb-4">
            Password updated successfully.
          </Alert>
        )}
        {errorMsg && (
          <Alert status="danger" variant="subtle" className="mb-4">
            {errorMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="currentPwd"
            type="password"
            label="Current Password"
            required
            autoComplete="current-password"
            value={form.current}
            onChange={f("current")}
          />
          <Input
            id="newPwd"
            type="password"
            label="New Password"
            required
            autoComplete="new-password"
            value={form.next}
            onChange={f("next")}
            placeholder="At least 6 characters"
          />
          <Input
            id="confirmPwd"
            type="password"
            label="Confirm New Password"
            required
            autoComplete="new-password"
            value={form.confirm}
            onChange={f("confirm")}
          />
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={status === "saving"}
              loadingText="Saving password..."
              icon={<Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
            >
              Save Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}