import React from "react";

const rows = [
  { label: "Название организации", value: "ООО «СМП-97»" },
  { label: "Юридический адрес", value: "394028, г. Воронеж, Монтажный проезд, д. 5/1, стр. 1" },
  { label: "Адрес для корреспонденции", value: "394042, г. Воронеж, Ленинский проспект, д. 125, пом. 2/1" },
  { label: "ИНН", value: "3663027250" },
  { label: "КПП", value: "366301001" },
  { label: "ОГРН", value: "1033600006334" },
  { label: "ОКВЭД", value: "23.61" },
  { label: "ОКПО", value: "47787639" },
  { label: "ОКАТО", value: "20401000000" },
  { label: "ОКФС", value: "16" },
  { label: "ОКМТО", value: "20701000001" },
  {
    label: "Расчётный счёт",
    value:
      "40702810713370100540 в Центрально-Черноземный Банк ПАО Сбербанк г. Воронеж",
  },
  { label: "БИК", value: "042007681" },
  { label: "Корреспондентский счёт", value: "30101810600000000681" },
  {
    label: "Телефон / факс",
    value: "8 (473) 226-72-08, 8 (473) 226-75-78",
  },
  {
    label: "Руководитель",
    value: "Генеральный директор Ардаков Алексей Анатольевич",
  },
  { label: "Действует на основании", value: "Устава" },
];

const CompanyRequisitesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <p className="font-medium text-gray-700">Ниже приведены реквизиты компании, в случае необходимости получения дополнительных документов: свидетельства о государственной регистрации, идентификационного номера налогоплательщика вы можете обратиться в бухгалтерию предприятия.</p>
      <table className="w-full border-collapse text-sm md:text-base">
        <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-gray-200">
            <td className="w-64 py-2 pr-6 font-medium text-gray-700">
              {row.label}:
            </td>
            <td className="py-2 text-gray-600">{row.value}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyRequisitesPage;
