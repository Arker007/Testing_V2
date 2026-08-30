import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./components/AdminTable.module.css";
import Spinner from "../../shared/components/ui/Spinner";
import { useToast } from "../../shared/components/ui";

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

      <div className={`${styles.card} ${styles.settingsCard}`}>
        <div className={styles.settingsHead}>
          <div className={styles.settingsTitleRow}>
            <div className={styles.settingsIcon}><Icon icon="solar:lock-password-linear" className="w-5 h-5 text-emerald-600" /></div>
            <h2 className={styles.settingsTitle}>Update Password</h2>
          </div>
          <p className={styles.settingsSub}>Enter your current password to set a new password for your account.</p>
        </div>

        {status === "success" && <div className={styles.alertSuccess}><Icon icon="solar:check-circle-linear" className="w-4 h-4 inline mr-1" /> Password updated successfully.</div>}
        {errorMsg && <div role="alert" className={styles.alertError}><Icon icon="solar:danger-circle-linear" className="w-4 h-4 inline mr-1" /> {errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPwd" className={styles.formLabel}>Current Password</label>
            <input id="currentPwd" type="password" className={styles.formInput} required autoComplete="current-password" value={form.current} onChange={f("current")} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPwd" className={styles.formLabel}>New Password</label>
            <input id="newPwd" type="password" className={styles.formInput} required autoComplete="new-password" value={form.next} onChange={f("next")} placeholder="At least 6 characters" />
          </div>
          <div className={`${styles.formGroup} ${styles.settingsFormTail}`}>
            <label htmlFor="confirmPwd" className={styles.formLabel}>Confirm New Password</label>
            <input id="confirmPwd" type="password" className={styles.formInput} required autoComplete="new-password" value={form.confirm} onChange={f("confirm")} />
          </div>
          <button type="submit" className={`${styles.actionBtnPrimary} ${styles.settingsSubmit}`} disabled={status === "saving"}>
            {status === "saving" ? <><Icon icon="solar:restart-linear" className="w-4 h-4 animate-spin mr-1 inline" /> Saving password...</> : <><Icon icon="solar:diskette-linear" className="w-4 h-4 mr-1 inline" /> Save Password</>}
          </button>
        </form>
      </div>
    </div>
  );
}