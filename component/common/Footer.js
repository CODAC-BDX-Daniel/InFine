import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-BluePrimary-1  relative pt-1 ">
                <div className="container mx-auto px-6">

                    <div className="sm:flex sm:mt-8">
                        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                            <div className="flex flex-col">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6">
                    <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
                        <div className="sm:w-2/3 text-center py-6">
                            <p className="text-sm text-white font-bold mb-2">
                                ©  2022 by InFine
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
