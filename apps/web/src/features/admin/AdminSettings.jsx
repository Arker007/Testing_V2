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
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label htmlFor="currentPwd" className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>Current Password</label>
            <input id="currentPwd" type="password" className="form-input" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #edf2f7" }} required autoComplete="current-password" value={form.current} onChange={f("current")} />
          </div>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label htmlFor="newPwd" className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>New Password</label>
            <input id="newPwd" type="password" className="form-input" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #edf2f7" }} required autoComplete="new-password" value={form.next} onChange={f("next")} placeholder="At least 6 characters" />
          </div>
          <div className={`form-group ${styles.settingsFormTail}`} style={{ marginBottom: "24px" }}>
            <label htmlFor="confirmPwd" className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>Confirm New Password</label>
            <input id="confirmPwd" type="password" className="form-input" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #edf2f7" }} required autoComplete="new-password" value={form.confirm} onChange={f("confirm")} />
          </div>
          <button type="submit" className={styles.actionBtnPrimary} style={{ width: "100%" }} disabled={status === "saving"}>
            {status === "saving" ? <><i className="fa-solid fa-spinner fa-spin" /> Saving password...</> : <><i className="fa-solid fa-floppy-disk" /> Save Password</>}
          </button>
        </form>
      </div>
    </div>
  );
}