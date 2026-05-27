import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { API_BASE_URL } from '../../utils/constants';
import { getPublicSetting } from '../../services/settingsService';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});



const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState([
    { icon: MapPin, title: 'Address', key: 'address', detail: '' },
    { icon: Phone, title: 'Phone', key: 'phone', detail: '' },
    { icon: Mail, title: 'Email', key: 'email', detail: '' },
    { icon: Clock, title: 'Working Hours', key: 'workingHours', detail: '' },
  ]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPublicSetting('contactInfo');
        if (res.data.value) {
          const info = res.data.value;
          setContactInfo((prev) =>
            prev.map((item) => ({
              ...item,
              detail: info[item.key] || item.detail,
            }))
          );
        }
      } catch {
        // use defaults
      }
    };
    fetch();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/contact`, data);
      setSuccess(true);
      reset();
    } catch (err) {
      console.error('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - WelfareOrg</title>
        <meta name="description" content="Get in touch with WelfareOrg for donations, volunteering, or general inquiries." />
      </Helmet>

      <section className="bg-primary-50 pt-28 pb-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-primary-900 mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            We would love to hear from you. Get in touch for any inquiries.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <h2 className="font-display text-2xl text-primary-800 mb-6">Send Us a Message</h2>

                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                      <Send size={28} className="text-primary-600" />
                    </div>
                    <h3 className="font-display text-xl text-primary-800 mb-2">Message Sent!</h3>
                    <p className="text-neutral-500 mb-4">Thank you for reaching out. We will get back to you shortly.</p>
                    <Button onClick={() => setSuccess(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Input
                      label="Your Name"
                      placeholder="Enter your name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                    <Input
                      label="Subject"
                      placeholder="What is this regarding?"
                      error={errors.subject?.message}
                      {...register('subject')}
                    />
                    <Input
                      type="textarea"
                      label="Message"
                      placeholder="Write your message here..."
                      error={errors.message?.message}
                      {...register('message')}
                    />
                    <Button type="submit" loading={submitting} icon={Send} size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl text-primary-800 mb-2">Get in Touch</h3>
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary-50">
                        <item.icon size={22} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary-800">{item.title}</h4>
                        <p className="text-sm text-neutral-500 mt-1">{item.detail}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
