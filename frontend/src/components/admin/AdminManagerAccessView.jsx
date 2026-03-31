import React, { useState, useEffect } from 'react';
import { getAdmins, updateManagerAccess } from '../../services/authService';

const AdminManagerAccessView = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingManager, setEditingManager] = useState(null);
  const [editForm, setEditForm] = useState({ trial_start_date: '', trial_end_date: '', status: 'Active' });

  const loadManagers = async () => {
    setLoading(true);
    try {
      const res = await getAdmins();
      if (res.success) {
        // Filter only managers
        setManagers(res.data.filter(u => u.role === 'Manager'));
      }
    } catch (err) {
      console.error('Failed to load managers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadManagers();
  }, []);

  const handleEditClick = (manager) => {
    setEditingManager(manager);
    setEditForm({
      trial_start_date: manager.trial_start_date ? manager.trial_start_date.split('T')[0] : '',
      trial_end_date: manager.trial_end_date ? manager.trial_end_date.split('T')[0] : '',
      status: manager.status || 'Active'
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateManagerAccess(editingManager.id, editForm);
      if (res.success) {
        alert('Manager access updated successfully');
        setEditingManager(null);
        loadManagers();
      }
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to update manager access');
    }
  };

  const toggleStatus = async (manager) => {
    const newStatus = manager.status === 'Inactive' ? 'Active' : 'Inactive';
    if (!window.confirm(`Are you sure you want to set this manager to ${newStatus}?`)) return;
    
    try {
      const res = await updateManagerAccess(manager.id, { status: newStatus });
      if (res.success) {
        loadManagers();
      }
    } catch (err) {
      alert('Failed to toggle status');
    }
  };

  return (
    <div className="view">
      <div className="page-header">
        <h1 className="page-h1">Manager Trial & Access Control</h1>
        <p className="page-sub">Manage manager trial periods and system access status</p>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">Registered Managers</div>
        </div>
        <div className="table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px' }}>Manager</th>
                <th style={{ padding: '12px 16px' }}>Reg. Date</th>
                <th style={{ padding: '12px 16px' }}>Trial Period</th>
                <th style={{ padding: '12px 16px' }}>Days Left</th>
                <th style={{ padding: '12px 16px' }}>Trial Status</th>
                <th style={{ padding: '12px 16px' }}>Acc. Status</th>
                <th style={{ padding: '12px 16px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
              ) : managers.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No managers found.</td></tr>
              ) : (
                managers.map(m => {
                  const regDate = new Date(m.createdAt).toLocaleDateString();
                  const trialStart = m.trial_start_date ? new Date(m.trial_start_date).toLocaleDateString() : 'N/A';
                  const trialEnd = m.trial_end_date ? new Date(m.trial_end_date).toLocaleDateString() : 'N/A';
                  
                  let daysLeft = 0;
                  let trialStatus = 'No Trial';
                  let trialColor = '#64748b';
                  
                  if (m.trial_end_date) {
                    const end = new Date(m.trial_end_date);
                    const now = new Date();
                    daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
                    
                    if (daysLeft <= 0) {
                      trialStatus = 'Expired';
                      trialColor = '#ef4444';
                      daysLeft = 0;
                    } else if (daysLeft <= 3) {
                      trialStatus = 'Expiring Soon';
                      trialColor = '#f59e0b';
                    } else {
                      trialStatus = 'Active';
                      trialColor = '#10b981';
                    }
                  }

                  const accStatus = m.status || 'Active';
                  const accColor = accStatus === 'Active' ? '#10b981' : '#ef4444';

                  return (
                    <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600 }}>{m.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{m.email}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>{regDate}</td>
                      <td style={{ padding: '12px 16px' }}>{trialStart} - {trialEnd}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{daysLeft}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ color: trialColor, fontWeight: 700 }}>{trialStatus}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ 
                          background: `${accColor}15`, 
                          color: accColor, 
                          padding: '4px 10px', 
                          borderRadius: 12, 
                          fontSize: '0.75rem', 
                          fontWeight: 700 
                        }}>
                          {accStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem' }} onClick={() => handleEditClick(m)}>
                            Edit
                          </button>
                          <button className="btn btn-solid" style={{ 
                            padding: '4px 8px', 
                            fontSize: '0.75rem', 
                            background: accStatus === 'Active' ? '#ef4444' : '#10b981' 
                          }} onClick={() => toggleStatus(m)}>
                            {accStatus === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingManager && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="panel" style={{ width: 400, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div className="panel-head">
              <div className="panel-title">Edit Manager Access: {editingManager.name}</div>
            </div>
            <div className="panel-body">
              <form onSubmit={handleUpdate}>
                <label className="form-label">Trial Start Date</label>
                <input type="date" className="input" value={editForm.trial_start_date} onChange={e => setEditForm({...editForm, trial_start_date: e.target.value})} required />
                
                <label className="form-label">Trial End Date</label>
                <input type="date" className="input" value={editForm.trial_end_date} onChange={e => setEditForm({...editForm, trial_end_date: e.target.value})} required />
                
                <label className="form-label">Account Status</label>
                <select className="input" value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button type="submit" className="btn btn-solid" style={{ flex: 1 }}>Save Changes</button>
                  <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setEditingManager(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagerAccessView;
