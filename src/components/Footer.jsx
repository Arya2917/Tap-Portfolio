const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © 2024 Arya Thanekar. All rights reserved.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground">
              Built by Arya Thanekar 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
