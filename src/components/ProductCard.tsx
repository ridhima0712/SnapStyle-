import React, { useState } from 'react';
import { Eye, Heart, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../data/catalog';
import { SafeImage } from './Graphics';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToBag: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToBag,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'One Size');
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToBag(product, selectedSize);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <article
      className="group flex flex-col bg-[#F6F3E8] border border-[#1A1415]/12 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#1A1415]/30"
    >
      {/* Image Frame */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE6D4] cursor-pointer"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          fallbackTitle={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${
            product.imageFocus || 'object-center'
          }`}
        />

        {/* Top Row Actions: Quiet Editorial Kicker + Wishlist */}
        <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between pointer-events-none">
          {product.isEmergencyEdit ? (
            <span className="text-[11px] font-semibold tracking-wide text-[#8B1E2D] bg-[#F6F3E8]/92 px-2 py-0.5">
              Emergency Edit
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className={`pointer-events-auto w-10 h-10 flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#8B1E2D] ${
              isWishlisted
                ? 'bg-[#8B1E2D] text-[#F6F3E8]'
                : 'bg-[#F6F3E8]/90 text-[#1A1415] hover:bg-[#F7D6DB] hover:text-[#8B1E2D]'
            }`}
          >
            <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom Quick View Strip on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none hidden sm:flex justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#F6F3E8]/95 text-[#1A1415] hover:bg-[#1A1415] hover:text-[#F6F3E8] transition-colors whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5C4D50] mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.collection}</span>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <h3
              onClick={() => onQuickView(product)}
              className="text-sm sm:text-[15px] font-semibold text-[#1A1415] leading-snug cursor-pointer hover:text-[#8B1E2D] transition-colors"
            >
              {product.name}
            </h3>
            <span className="text-[15px] font-semibold text-[#1A1415] tabular-nums whitespace-nowrap shrink-0">
              {formatINR(product.price)}
            </span>
          </div>
        </div>

        {/* Sizes & Add to Bag */}
        <div className="pt-2 border-t border-[#1A1415]/10 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1" role="group" aria-label={`Select size for ${product.name}`}>
              {product.sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[28px] h-7 px-1.5 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E2D] ${
                      active
                        ? 'bg-[#1A1415] text-[#F6F3E8]'
                        : 'text-[#5C4D50] hover:text-[#1A1415] hover:bg-[#ECE6D4]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            <span
              className="w-3.5 h-3.5 rounded-full border border-[#1A1415]/20 shrink-0"
              style={{ backgroundColor: product.colourHex }}
              title={product.colour}
              aria-label={`Colour: ${product.colour}`}
            />
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 text-xs font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#8B1E2D] ${
              justAdded
                ? 'bg-[#1A1415] text-[#F6F3E8]'
                : 'bg-[#8B1E2D] text-[#F6F3E8] hover:bg-[#6D1521]'
            }`}
          >
            {justAdded ? (
              'Added to Bag'
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
