import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const RegisterPage = () => {
  return (
    <MainLayout>
      <section className="section" id="register-choice" style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center' }}>
        <div className="container center">
          <div className="auth-card animate-fade-up" style={{ margin: '0 auto', maxWidth: 500, padding: '40px 32px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', borderRadius: 16 }}>
            <div className="auth-logo-wrap" style={{ marginBottom: 24, textAlign: 'center' }}>
              <span className="auth-brand" style={{ fontWeight: 800, fontSize: '2rem', letterSpacing: 1, color: 'var(--primary)' }}>shnoor</span>
            </div>
            <h2 className="auth-heading" style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 12 }}>Join our platform</h2>
            <p className="auth-sub-text" style={{ marginBottom: 32, fontSize: '1.1rem', color: '#64748b' }}>Choose your account type to get started</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Link to="/register/admin" className="role-choice-card" style={{ 
                textDecoration: 'none', 
                padding: '24px', 
                border: '2px solid #e2e8f0', 
                borderRadius: 12, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 20, 
                transition: 'all 0.3s ease',
                backgroundColor: '#fff'
              }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontSize: '1.5rem' }}>
                  <i className="fas fa-user-shield"></i>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontWeight: 700, fontSize: '1.2rem' }}>Platform Administrator</h3>
                  <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem', lineHeight: 1.4 }}>Manage the entire platform, companies, and global settings.</p>
                </div>
              </Link>

              <Link to="/register/manager" className="role-choice-card" style={{ 
                textDecoration: 'none', 
                padding: '24px', 
                border: '2px solid #e2e8f0', 
                borderRadius: 12, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 20, 
                transition: 'all 0.3s ease',
                backgroundColor: '#fff'
              }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', fontSize: '1.5rem' }}>
                  <i className="fas fa-user-tie"></i>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontWeight: 700, fontSize: '1.2rem' }}>Team Manager</h3>
                  <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem', lineHeight: 1.4 }}>Lead your team, manage attendance, and start a 15-day free trial.</p>
                </div>
              </Link>
            </div>

            <p className="auth-foot-text" style={{ marginTop: 32, fontSize: '1rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
      <style>{`
        .role-choice-card:hover {
          border-color: var(--primary) !important;
          transform: translateY(-4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
      `}</style>
    </MainLayout>
  );
};

export default RegisterPage;
