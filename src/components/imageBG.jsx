/* eslint-disable react/prop-types */


const ImageBG = ({image, props, children, classname, min=true}) => {
  return (
    <div className={`relative ${classname} ${min ? 'h-min' : ''}`} {...props}>
        <div className="relative z-10 h-full">
          {children}
        </div>
        <img src={image} className="absolute top-0 left-0 z-0 object-cover h-full w-full" />
    </div>
  );
}

export default ImageBG;