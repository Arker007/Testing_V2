import { useState } from "react";
import styles from "./components/AdminTable.module.css";

export default function AdminSettings() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState(null); 
  const [errorMsg, setErrorMsg] = useState("");

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setErrorMsg("");
    if (form.next.length < 6) { setErrorMsg("New password must be at least 6 characters long."); return; }
    if (form.next !== form.confirm) { setErrorMsg("Passwords do not match."); return; }

    setStatus("saving");
    try {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
      });
      if (res.ok) { setStatus("success"); setForm({ current: "", next: "", confirm: "" }); } 
      else { const data = await res.json(); setErrorMsg(data.error || "Failed to update password. Please check your current password."); setStatus("error"); }
    } catch { setErrorMsg("A network error occurred. Please try again."); setStatus("error"); }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.toolbar}>
        <p className={styles.count}>Account Settings</p>
      </div>

      <div className={`${styles.card} ${styles.settingsCard}`}>
        <div className={styles.settingsHead}>
          <div className={styles.settingsTitleRow}>
            <div className={styles.settingsIcon}><i className="fa-solid fa-lock" /></div>
            <h2 className={styles.settingsTitle}>Update Password</h2>
          </div>
          <p className={styles.settingsSub}>Enter your current password to set a new password for your account.</p>
        </div>

        {status === "success" && <div className={styles.alertSuccess}><i className="fa-solid fa-circle-check" /> Password updated successfully.</div>}
        {errorMsg && <div role="alert" className={styles.alertError}><i className="fa-solid fa-circle-exclamation" /> {errorMsg}</div>}

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
            {status === "saving" ? <><i className="fa-solid fa-spinner fa-spin" /> Saving password...</> : <><i className="fa-solid fa-floppy-disk" /> Save Password</>}
          </button>
        </form>
      </div>
    </div>
  );
}