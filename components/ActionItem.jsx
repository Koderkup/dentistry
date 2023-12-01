import React from "react";
import Image from "next/image";
function ActionItem() {
  return (
    <div style={{margin: '10px auto', maxWidth: '1000px'}}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">
            Подарочный сертификат на стоматологические услуги
          </h3>
          <h5 className="card-text">
            Прекрасное решение при выборе подарка для родных и близких. Можно,
            например, гигиеническую чистку подарить.
          </h5>
          <p className="card-text">
            <small className="text-muted">Mirastom</small>
          </p>
        </div>
        <Image
          src="/assets/sertificat.png"
          className="card-img-bottom"
          alt="..."
          width={700}
          height={400}
        />
      </div>
    </div>
 
  );
}

export default ActionItem;
