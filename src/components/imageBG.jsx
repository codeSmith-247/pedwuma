

const ImageBG = ({image, props, children, classname}) => {
  return (
    <div className={`relative h-min ${classname}`} {...props}>
        <div className="relative z-10">
          {children}
        </div>
        <img src={image} alt="background" className="absolute top-0 left-0 z-0 object-cover h-full w-full" />
    </div>
  );
}

export default ImageBG;