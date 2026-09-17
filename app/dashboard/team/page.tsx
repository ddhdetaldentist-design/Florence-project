'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  getTeamMembers, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} from '@/lib/site-settings-service';
import { uploadProductImage } from '@/lib/products-service';
import { TeamMemberItem } from '@/types';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  X, 
  AlertCircle 
} from 'lucide-react';

export default function TeamManagementPage() {
  const [items, setItems] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMemberItem | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('/img/prof.jpg');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getTeamMembers();
      setItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setRole('Design & Manufacturing Consultant');
    setImage('/img/prof.jpg');
    setFacebook('');
    setLinkedin('');
    setWhatsapp('https://wa.me/201065772456');
    setIsModalOpen(true);
  };

  const openEditModal = (item: TeamMemberItem) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setImage(item.image);
    setFacebook(item.facebook || '');
    setLinkedin(item.linkedin || '');
    setWhatsapp(item.whatsapp || '');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);
    try {
      const res = await uploadProductImage(file);
      if (res.url) {
        setImage(res.url);
      } else {
        setError('Upload failed: ' + res.error);
      }
    } catch (err: any) {
      setError('Upload error: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      setError('Please provide member name and role');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editingItem) {
        const res = await updateTeamMember(editingItem.id, {
          name,
          role,
          image,
          facebook: facebook || undefined,
          linkedin: linkedin || undefined,
          whatsapp: whatsapp || undefined,
        });
        if (res.item) {
          setItems((prev) => prev.map((m) => (m.id === editingItem.id ? res.item! : m)));
          setIsModalOpen(false);
        } else {
          setError(res.error || 'Update failed');
        }
      } else {
        const res = await createTeamMember({
          name,
          role,
          image,
          facebook: facebook || undefined,
          linkedin: linkedin || undefined,
          whatsapp: whatsapp || undefined,
        });
        if (res.item) {
          setItems((prev) => [...prev, res.item!]);
          setIsModalOpen(false);
        } else {
          setError(res.error || 'Creation failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    const res = await deleteTeamMember(id);
    if (res.success) {
      setItems((prev) => prev.filter((m) => m.id !== id));
    } else {
      alert('Delete failed: ' + res.error);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Team Members Management</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage engineers, master designers, and leadership featured on the homepage and about page.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Team Grid */}
      {loading ? (
        <div className="p-12 text-center text-zinc-400 text-sm">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading team members...
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center text-zinc-400 text-xs bg-[#181822] rounded-2xl border border-zinc-800">
          No team members found. Click &quot;Add Team Member&quot; to add your leadership or staff.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((member) => (
            <div key={member.id} className="bg-[#181822] rounded-2xl border border-zinc-800 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full bg-zinc-900">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm p-1.5 rounded-xl">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-primary hover:text-zinc-950 text-white transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500 text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-primary font-medium">{member.role}</p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-3 text-xs text-zinc-400 border-t border-zinc-800/60 mt-3">
                {member.facebook && (
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    Facebook
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    LinkedIn
                  </a>
                )}
                {member.whatsapp && (
                  <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181822] border border-zinc-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center gap-4 pb-2">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0">
                  <Image src={image} alt="Member photo" fill className="object-cover" />
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-primary flex items-center gap-1.5 border border-zinc-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eng. Mohamed Atef"
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Position / Job Title *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Owner & General Manager"
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">WhatsApp Link or Phone</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="https://wa.me/201065772456"
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">LinkedIn Profile Link (Optional)</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Facebook Profile Link (Optional)</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 text-xs font-bold shadow-lg shadow-primary/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Member'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
