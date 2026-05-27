import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Save, Globe, Share2, Home, Smartphone, Building2, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const tabs = [
  { id: 'general', label: 'General', icon: Building2 },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'homepage', label: 'Homepage', icon: Home },
  { id: 'contact', label: 'Contact Info', icon: Smartphone },
];

function GeneralSettingsForm({ showToast }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { orgName: 'WelfareOrg', tagline: 'Bringing Hope to Those in Need', email: 'info@welfareorg.org' },
  });

  const onSubmit = () => showToast('General settings saved successfully');
  const [saving, setSaving] = useState(false);

  const handleSave = async (data) => {
    setSaving(true);
    setTimeout(() => { onSubmit(data); setSaving(false); }, 500);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Organization Name" placeholder="Enter organization name" error={errors.orgName?.message} {...register('orgName', { required: 'Organization name is required' })} />
        <Input label="Tagline" placeholder="Enter tagline" error={errors.tagline?.message} {...register('tagline', { required: 'Tagline is required' })} />
        <Input label="Email" type="email" placeholder="info@example.com" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" loading={saving} icon={Save}>Save Settings</Button>
      </div>
    </form>
  );
}

function SocialMediaForm({ showToast }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { facebook: 'https://facebook.com/welfareorg', twitter: 'https://twitter.com/welfareorg', instagram: 'https://instagram.com/welfareorg', youtube: 'https://youtube.com/@welfareorg' },
  });

  const [saving, setSaving] = useState(false);
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { showToast('Social media links saved successfully'); setSaving(false); }, 500);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Facebook URL" placeholder="https://facebook.com/..." {...register('facebook')} icon={Globe} />
        <Input label="Twitter URL" placeholder="https://twitter.com/..." {...register('twitter')} icon={Globe} />
        <Input label="Instagram URL" placeholder="https://instagram.com/..." {...register('instagram')} icon={Globe} />
        <Input label="YouTube URL" placeholder="https://youtube.com/..." {...register('youtube')} icon={Globe} />
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" loading={saving} icon={Save}>Save Settings</Button>
      </div>
    </form>
  );
}

function HomepageForm({ showToast }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { heroTitle: 'Building a Better Tomorrow for Everyone', heroSubtitle: 'Join us in our mission to uplift communities through education, healthcare, and sustainable development programs.', ctaText: 'Donate Now' },
  });

  const [saving, setSaving] = useState(false);
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { showToast('Homepage content saved successfully'); setSaving(false); }, 500);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
      <Input label="Hero Title" placeholder="Enter hero title" {...register('heroTitle')} />
      <Input label="Hero Subtitle" type="textarea" placeholder="Enter hero subtitle" {...register('heroSubtitle')} />
      <Input label="CTA Button Text" placeholder="e.g. Donate Now" {...register('ctaText')} />
      <div className="flex justify-end pt-2">
        <Button type="submit" loading={saving} icon={Save}>Save Settings</Button>
      </div>
    </form>
  );
}

function ContactForm({ showToast }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { phone: '+92 300 1234567', address: '123 Welfare Street, Islamabad, Pakistan', workingHours: 'Mon - Fri: 9:00 AM - 5:00 PM' },
  });

  const [saving, setSaving] = useState(false);
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { showToast('Contact information saved successfully'); setSaving(false); }, 500);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Phone Number" placeholder="+92 300 1234567" {...register('phone')} />
        <Input label="Working Hours" placeholder="Mon - Fri: 9:00 AM - 5:00 PM" {...register('workingHours')} />
        <div className="md:col-span-2">
          <Input label="Address" placeholder="Enter address" {...register('address')} />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" loading={saving} icon={Save}>Save Settings</Button>
      </div>
    </form>
  );
}

function WebsiteSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const tabContent = {
    general: <GeneralSettingsForm showToast={showToast} />,
    social: <SocialMediaForm showToast={showToast} />,
    homepage: <HomepageForm showToast={showToast} />,
    contact: <ContactForm showToast={showToast} />,
  };

  return (
    <>
      <Helmet><title>Website Settings - WelfareOrg Admin</title></Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-800">Website Settings</h1>
          <p className="text-gray-500">Manage your website content and information</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-primary-100 pb-px">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg transition-colors relative ${
                  isActive ? 'text-primary-700 bg-white border border-primary-100 border-b-white -mb-px' : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-lg ${
              activeTab === 'general' ? 'bg-primary-50' :
              activeTab === 'social' ? 'bg-blue-50' :
              activeTab === 'homepage' ? 'bg-amber-50' : 'bg-green-50'
            }`}>
              {activeTab === 'general' && <Building2 className="w-5 h-5 text-primary-600" />}
              {activeTab === 'social' && <Share2 className="w-5 h-5 text-blue-600" />}
              {activeTab === 'homepage' && <Home className="w-5 h-5 text-amber-600" />}
              {activeTab === 'contact' && <Smartphone className="w-5 h-5 text-green-600" />}
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-primary-800">
                {tabs.find((t) => t.id === activeTab)?.label} Settings
              </h3>
              <p className="text-xs text-gray-400">
                {activeTab === 'general' && 'Update your organization name, tagline, and email'}
                {activeTab === 'social' && 'Manage social media profile links'}
                {activeTab === 'homepage' && 'Edit homepage hero and call-to-action content'}
                {activeTab === 'contact' && 'Update phone, address, and working hours'}
              </p>
            </div>
          </div>
          {tabContent[activeTab]}
        </Card>
      </div>
    </>
  );
}

export default WebsiteSettingsPage;
