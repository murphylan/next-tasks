

const OrganizationLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-2xl mx-auto">
      <div className="flex gap-x-7">
       
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
