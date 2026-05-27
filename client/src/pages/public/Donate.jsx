import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Heart, Shield, Lock, Wallet, Landmark, Smartphone,
  CheckCircle, Sparkles, TrendingUp, Users, Gift, ArrowRight, User, CreditCard, MessageSquare, Copy, ExternalLink
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { submitDonation } from '../../services/donationService';
import { DONATION_METHODS } from '../../utils/constants';

const presetAmounts = [
  { value: 1000, label: 'Rs. 1,000', desc: 'Meal for a family' },
  { value: 2500, label: 'Rs. 2,500', desc: 'School supplies' },
  { value: 5000, label: 'Rs. 5,000', desc: 'Medical checkup camp' },
  { value: 10000, label: 'Rs. 10,000', desc: 'Sponsor a child' },
  { value: 25000, label: 'Rs. 25,000', desc: 'Community project' },
];

const impactNumbers = [
  { icon: Heart, value: '50,000+', label: 'Lives Impacted' },
  { icon: TrendingUp, value: '200+', label: 'Active Programs' },
  { icon: Users, value: '12+', label: 'Years of Service' },
];

const paymentOptions = [
  { value: 'jazzcash', label: 'JazzCash', icon: Smartphone, desc: 'Send via JazzCash app', number: '0300-1234567', barColor: 'bg-orange-500', bgLight: 'bg-orange-50', borderLight: 'border-orange-200', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { value: 'easypaisa', label: 'EasyPaisa', icon: Smartphone, desc: 'Send via EasyPaisa app', number: '0300-7654321', barColor: 'bg-green-500', bgLight: 'bg-green-50', borderLight: 'border-green-200', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { value: 'bank', label: 'Bank Transfer', icon: Landmark, desc: 'Direct bank transfer', number: 'Account: 1234-5678-9012', barColor: 'bg-blue-500', bgLight: 'bg-blue-50', borderLight: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
];

const donationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Enter a valid amount'),
  paymentMethod: z.string().min(1, 'Select a payment method'),
  message: z.string().optional(),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

const Donate = () => {
  const [customAmount, setCustomAmount] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(1000);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(donationSchema),
    defaultValues: { amount: '1000' },
  });

  const selectedPayment = watch('paymentMethod');

  const handlePresetAmount = (val) => {
    setSelectedPreset(val);
    setCustomAmount(false);
    setValue('amount', String(val), { shouldValidate: true });
  };

  const handleCustomToggle = () => {
    setCustomAmount(true);
    setSelectedPreset(null);
    setValue('amount', '', { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitDonation({
        donorName: data.name,
        donorEmail: data.email,
        donorPhone: data.phone,
        amount: Number(data.amount),
        paymentMethod: data.paymentMethod,
        message: data.message || '',
      });
      setSuccess(true);
      reset();
      setCustomAmount(false);
      setSelectedPreset(1000);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit donation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <>
        <Helmet><title>Thank You - WelfareOrg</title></Helmet>
        <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-lg w-full"
          >
            <Card className="text-center p-10">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary-600" fill="currentColor" />
              </div>
              <h1 className="font-display text-3xl text-primary-800 mb-3">Thank You!</h1>
              <p className="text-neutral-500 mb-2">Your generosity will make a real difference.</p>
              <p className="text-sm text-neutral-400 mb-8">We've sent a confirmation to your email.</p>
              <div className="bg-primary-50 rounded-xl p-5 border border-primary-100 mb-8">
                <Sparkles className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-primary-700 font-medium italic">"No one has ever become poor by giving."</p>
                <p className="text-xs text-neutral-400 mt-1">— Anne Frank</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => setSuccess(false)}>Donate Again</Button>
                <Button variant="ghost" onClick={() => window.location.href = '/'}>Go Home</Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Donate - WelfareOrg</title>
        <meta name="description" content="Support our cause by making a donation. Your contribution helps build better communities." />
      </Helmet>

      <section className="bg-primary-50 pt-28 pb-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 text-sm px-4 py-1.5 rounded-full mb-5">
              <Heart className="w-4 h-4" fill="currentColor" /> Make a Difference Today
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-primary-900 leading-tight mb-4">
              Every Rupee{' '}
              <span className="text-primary-500">Changes Lives</span>
            </h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-8">
              Your donation provides food, education, healthcare, and hope to families who need it most.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {impactNumbers.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-primary-200">
                <item.icon className="w-4 h-4 text-primary-600" />
                <span className="font-bold text-primary-900 text-sm">{item.value}</span>
                <span className="text-neutral-500 text-xs">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="rounded-xl bg-white shadow-sm border border-primary-100 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-500" />

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-primary-50">
                      <CreditCard className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl text-primary-800">Make a Donation</h2>
                      <p className="text-sm text-neutral-500">Your contribution creates lasting change</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate onInvalid={(e) => e.preventDefault()} className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-primary-500" />
                        <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wider">Personal Information</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Full Name" placeholder="Enter your full name" error={errors.name?.message} {...register('name')} />
                        <Input label="Email Address" type="email" placeholder="Enter your email" error={errors.email?.message} {...register('email')} />
                        <Input label="Phone Number" type="tel" placeholder="Enter your phone number" error={errors.phone?.message} {...register('phone')} />
                      </div>
                    </div>

                    <hr className="border-primary-100" />

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Wallet className="w-4 h-4 text-primary-500" />
                        <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wider">Donation Details</h3>
                      </div>

                      <div className="mb-5">
                        <label className="mb-3 block text-sm font-medium text-primary-700">Choose Amount</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {presetAmounts.map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => handlePresetAmount(item.value)}
                              className={`rounded-xl p-3 text-center border-2 transition-all duration-200 ${
                                selectedPreset === item.value && !customAmount
                                  ? 'border-primary-600 bg-primary-50 shadow-sm ring-1 ring-primary-600/20'
                                  : 'border-primary-100 hover:border-primary-300 bg-white hover:shadow-sm'
                              }`}
                            >
                              <p className={`font-bold text-sm ${selectedPreset === item.value && !customAmount ? 'text-primary-700' : 'text-gray-800'}`}>
                                {item.label}
                              </p>
                              <p className={`text-[10px] mt-0.5 ${selectedPreset === item.value && !customAmount ? 'text-primary-500' : 'text-gray-400'}`}>
                                {item.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            type="button"
                            onClick={handleCustomToggle}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                              customAmount
                                ? 'border-primary-600 bg-primary-50 text-primary-700'
                                : 'border-primary-200 text-gray-500 hover:border-primary-300'
                            }`}
                          >
                            Custom Amount
                          </button>
                          {customAmount && (
                            <div className="flex-1 max-w-xs">
                              <input
                                type="number"
                                placeholder="Enter amount"
                                {...register('amount')}
                                className="w-full rounded-lg border border-primary-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              />
                            </div>
                          )}
                        </div>
                        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
                      </div>

                      <div>
                        <label className="mb-4 block text-sm font-medium text-primary-700">Payment Method</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {paymentOptions.map((opt) => {
                            const isSelected = selectedPayment === opt.value;
                            return (
                              <label
                                key={opt.value}
                                className={`relative block rounded-xl border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                                  isSelected
                                    ? 'border-primary-600 shadow-md ring-1 ring-primary-600/20'
                                    : 'border-primary-100 hover:border-primary-300 hover:shadow-sm bg-white'
                                }`}
                              >
                                <div className={`h-1.5 ${opt.barColor} ${isSelected ? 'opacity-100' : 'opacity-40'}`} />
                                <div className="p-4">
                                  <input type="radio" value={opt.value} {...register('paymentMethod')} className="sr-only" />
                                  <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2.5 rounded-xl ${isSelected ? opt.iconBg : 'bg-gray-50'}`}>
                                      <opt.icon className={`w-5 h-5 ${isSelected ? opt.iconColor : 'text-gray-400'}`} />
                                    </div>
                                    {isSelected && (
                                      <div className={`p-1 rounded-full ${opt.iconBg}`}>
                                        <CheckCircle className={`w-4 h-4 ${opt.iconColor}`} fill="currentColor" />
                                      </div>
                                    )}
                                  </div>
                                  <p className={`text-sm font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{opt.label}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                                  <div className={`mt-3 flex items-center justify-between rounded-lg border px-3 py-2 ${
                                    isSelected ? opt.borderLight + ' ' + opt.bgLight : 'border-gray-100 bg-gray-50'
                                  }`}>
                                    <span className={`text-[11px] font-mono font-medium ${isSelected ? opt.iconColor : 'text-gray-500'}`}>
                                      {opt.number}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => { e.stopPropagation(); handleCopy(opt.number); }}
                                      className={`p-1 rounded transition-colors ${isSelected ? 'hover:bg-white/50' : 'hover:bg-gray-200'}`}
                                      title="Copy"
                                    >
                                      <Copy className={`w-3.5 h-3.5 ${isSelected ? opt.iconColor : 'text-gray-400'}`} />
                                    </button>
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                        {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>}
                      </div>

                      {selectedPayment && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl bg-white border border-primary-200 overflow-hidden"
                        >
                          <div className="flex items-center gap-2 px-4 py-3 bg-primary-50 border-b border-primary-100">
                            <Wallet className="w-4 h-4 text-primary-600" />
                            <p className="text-xs font-medium text-primary-700">Payment Instructions</p>
                          </div>
                          <div className="px-4 py-3">
                            <p className="text-sm text-neutral-600">
                              Transfer the donation amount to the selected account above, then fill in your details and submit this form for confirmation.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <hr className="border-primary-100" />

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="w-4 h-4 text-primary-500" />
                        <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wider">Message</h3>
                      </div>
                      <Input type="textarea" label="Message (Optional)" placeholder="Leave a message with your donation..." {...register('message')} />
                    </div>

                    {submitError && (
                      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200">{submitError}</div>
                    )}

                    <div className="bg-primary-50/70 rounded-xl p-4 flex items-start gap-3 border border-primary-100">
                      <div className="p-2 rounded-full bg-primary-100 shrink-0">
                        <Lock className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-800">Secure Donation</p>
                        <p className="text-xs text-neutral-500">Your payment information is encrypted and secure.</p>
                      </div>
                    </div>

                    <Button type="submit" loading={submitting} icon={Heart} size="lg" className="w-full shadow-sm">
                      Donate Now — {customAmount ? 'Custom' : `Rs. ${(selectedPreset || 0).toLocaleString()}`}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3 className="font-display text-xl text-primary-800 mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary-600" /> Payment Methods
                </h3>
                <div className="space-y-3">
                  {DONATION_METHODS.map((method, i) => (
                    <motion.div
                      key={method.id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Card className="card-hover">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary-50">
                            <Landmark className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-primary-800">{method.name}</p>
                            {method.number && <p className="text-sm text-neutral-500 mt-0.5">{method.number}</p>}
                            {method.details && <p className="text-sm text-neutral-500 mt-0.5">{method.details}</p>}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Card>
                <h3 className="font-display text-lg text-primary-800 mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary-600" /> Why Give?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Heart, text: '100% goes to welfare programs — zero overhead' },
                    { icon: Shield, text: 'Full transparency with regular impact reports' },
                    { icon: Lock, text: 'Secured payment with industry-standard encryption' },
                    { icon: CheckCircle, text: 'Tax-exempt donations with official receipts' },
                    { icon: TrendingUp, text: 'Every rupee creates measurable, lasting change' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="rounded-full bg-primary-50 p-1.5 mt-0.5">
                        <item.icon className="w-3.5 h-3.5 text-primary-600" />
                      </div>
                      <p className="text-sm text-neutral-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-primary-600 to-primary-700 border-0">
                <h3 className="font-display text-lg text-white mb-3">Together We Can Do More</h3>
                <p className="text-primary-100 text-sm mb-4">Join thousands of supporters making a difference every day.</p>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex -space-x-2">
                    {['#3B6D11', '#639922', '#97C459', '#C0DD97'].map((color, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <p className="text-xs text-primary-200">Backed by 2,000+ supporters</p>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-neutral-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary-500" />
              Every donation, big or small, creates ripples of change.
              <ArrowRight className="w-4 h-4 text-primary-500" />
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Donate;
