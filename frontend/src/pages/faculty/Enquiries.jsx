import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { Mail, Info, X, ArrowLeft, AlertTriangle, AlertCircle, Info as InfoIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PriorityDisplay = ({ urgency }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-flex items-center gap-x-1.5 border";
    switch (urgency) {
        case 'urgent':
            return (
                <span className={`${baseClasses} bg-destructive/10 text-destructive border-destructive/20`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Urgent
                </span>
            );
        case 'high':
            return (
                <span className={`${baseClasses} bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    High
                </span>
            );
        case 'medium':
            return (
                <span className={`${baseClasses} bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400`}>
                    <AlertCircle className="w-3.5 h-3.5" />
                    Medium
                </span>
            );
        case 'low':
            return (
                <span className={`${baseClasses} bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400`}>
                    <InfoIcon className="w-3.5 h-3.5" />
                    Low
                </span>
            );
        default:
            return (
                <span className={`${baseClasses} bg-secondary text-secondary-foreground border-border`}>
                    <InfoIcon className="w-3.5 h-3.5" />
                    Normal
                </span>
            );
    }
};

const FacultyEnquiries = () => {
    const navigate = useNavigate();
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await api.get('/api/enquiries');
                
                const backendData = res.data || [];
                const processedBackendData = backendData.map(enq => ({
                    ...enq,
                    urgency: enq.urgency || 'normal'
                }));
                setEnquiries(processedBackendData);
            } catch (err) {
                setEnquiries([]);
                setError('Failed to load enquiries. Connect backend for live data.');
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    const handleViewDetails = (enq) => {
        setSelectedEnquiry(enq);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setSelectedEnquiry(null), 300);
    };

    const formatDateTime = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-background font-sans pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => navigate('/faculty/dashboard')}
                            className="flex items-center gap-2 px-4 py-2 text-muted-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors border border-border text-sm font-medium"
                        >
                            <ArrowLeft className="text-sm" />
                            <span>Back to Dashboard</span>
                        </button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Student Enquiries</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Review incoming student inquiries, complaints, and general messaging.</p>
                    </div>
                </header>

                {loading && (
                    <div className="text-center p-12 flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                        <p className="text-muted-foreground font-medium">Fetching enquiries...</p>
                    </div>
                )}
                
                {error && (
                    <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-600 dark:text-yellow-400 text-sm font-medium flex items-center">
                        <InfoIcon className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                )}

                {!loading && (
                    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-[768px] w-full table-fixed divide-y divide-border">
                                <thead className="bg-secondary/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase w-[22%]">Student</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase w-[25%]">Message Snapshot</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase w-[20%]">Received On</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase w-[15%]">Priority</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border bg-card">
                                    {enquiries.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-16 text-muted-foreground">
                                                <div className="bg-secondary/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Mail className="w-8 h-8 opacity-50" />
                                                </div>
                                                <p className="text-base font-medium">No enquiries found</p>
                                                <p className="text-sm opacity-70 mt-1">Check back later for new messages.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        enquiries.map((enq, index) => (
                                            <motion.tr 
                                                key={enq.id || enq._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-muted/50 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4 align-top">
                                                    <div className="font-semibold text-foreground truncate">{enq.name}</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5 truncate">{enq.email}</div>
                                                </td>
                                                <td className="px-6 py-4 align-top">
                                                    <div className="text-sm text-foreground truncate max-w-[200px]" title={enq.message}>{enq.message}</div>
                                                    <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mt-1.5">{enq.course || 'General Inquiry'}</div>
                                                </td>
                                                <td className="px-6 py-4 align-top text-sm font-medium text-muted-foreground">
                                                    {formatDateTime(enq.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 align-top text-center">
                                                    <PriorityDisplay urgency={enq.urgency || 'normal'} />
                                                </td>
                                                <td className="px-6 py-4 align-top text-right">
                                                    <button
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                                                        onClick={() => handleViewDetails(enq)}
                                                    >
                                                        <Info className="w-4 h-4" />
                                                        Details
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showModal && selectedEnquiry && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="bg-card w-full max-w-2xl rounded-2xl shadow-xl border border-border relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 md:p-8 overflow-y-auto">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Message from {selectedEnquiry.name}</h2>
                                        <p className="text-sm font-medium text-muted-foreground mt-1 px-3 py-1 bg-secondary rounded-full inline-block">
                                            Topic: {selectedEnquiry.course || 'General'}
                                        </p>
                                    </div>
                                    <button
                                        className="text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-full p-2 transition-colors shrink-0"
                                        onClick={closeModal}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                <div className="flex items-center gap-3 text-xs text-muted-foreground border-b border-border pb-4 mb-6">
                                    <span className="font-medium bg-background px-2 py-1 border border-border rounded-md shadow-sm">
                                        Received: {formatDateTime(selectedEnquiry.createdAt)}
                                    </span>
                                    <PriorityDisplay urgency={selectedEnquiry.urgency || 'normal'} />
                                </div>

                                <div className="bg-secondary/30 rounded-xl p-5 border border-border">
                                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Full Message</h3>
                                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                        {selectedEnquiry.message}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-secondary/50 border-t border-border px-6 py-4 flex justify-between items-center sm:flex-row flex-col gap-4">
                                <div className="text-sm text-center sm:text-left flex flex-col">
                                    <span className="font-semibold text-foreground">{selectedEnquiry.name}</span>
                                    <a href={`mailto:${selectedEnquiry.email}`} className="text-primary hover:underline font-medium">
                                        {selectedEnquiry.email}
                                    </a>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg hover:bg-accent transition-colors shadow-sm"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    <a
                                        href={`mailto:${selectedEnquiry.email}`}
                                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 shadow-sm transition-all"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FacultyEnquiries;
